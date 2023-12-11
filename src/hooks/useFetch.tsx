import { useState } from "react";
import { getStorage } from "../utils/getStorage";
import { Beware } from "../components/Beware";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

type FetchOptions = {
   method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
   content?: number;
   body?: FormData | string;
};

type UseFetchResult = {
   data: object | null;
   status: number | null;
   loading: boolean;
};

const useFetch = () => {
   const [loading, setLoading] = useState(false);

   const fetchData = async (
      url: string,
      options: FetchOptions = {},
   ): Promise<UseFetchResult> => {
      try {
         setLoading(true);
         if (!options.method) {
            const link = import.meta.env.VITE_API_URL + url;
            const response = await fetch(link);

            const status = response.status;

            if (response.ok) {
               const data = await response.json();
               return { data, status, loading: false };
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Ops!",
                  text: "Não foi possível se conectar!",
                  showConfirmButton: false,
                  timer: 1500,
               });
               throw new Error(`Request failed with status ${status}`);
            }
         } else {
            const requestOptions: RequestInit = {
               method: options.method,
               headers: {
                  Authorization: getStorage("accessToken") || "",
               },
            };
            if (options.content === 2) {
               const formData = options.body as FormData;
               requestOptions.body = formData;
            } else if (options.body) {
               requestOptions.body = options.body;
            }
            const response = await fetch(
               import.meta.env.VITE_API_URL + url,
               requestOptions,
            );

            const status = response.status;
            const data = await response.json();
            if (status === 403) {
               ReactDOM.render(<Beware />, document.getElementById("root"));
            }
            if (!response.ok) {
               Swal.fire({
                  icon: "error",
                  title: "Ops!",
                  text: "Não foi possível se conectar!",
                  showConfirmButton: false,
                  timer: 1500,
               });
               throw new Error(`Request failed with status ${status}`);
            }

            return { data, status, loading: false };
         }
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Não foi possível se conectar!",
            showConfirmButton: false,
            timer: 1500,
         });
         throw error; // Propagar o erro para quem estiver usando o hook
      } finally {
         setLoading(false);
      }
   };

   return { fetchData, loading };
};

export default useFetch;
