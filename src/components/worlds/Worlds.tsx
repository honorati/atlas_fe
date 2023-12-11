import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../form/Input";
import { Loading } from "../Loading";
import Swal from "sweetalert2";
import useFetch from "../../hooks/useFetch";
import "../../style/Form.css";

const World = () => {
   const search = useRef<HTMLInputElement>(null);
   const { paramId } = useParams();
   const { fetchData, loading } = useFetch();

   function handleSearch(event: React.FormEvent) {
      event.preventDefault();

      const methodRequest = paramId ? "PATCH" : "POST";
      const formData = new FormData();
      formData.append("search", search.current?.value || "");
      try {
         fetchData("/world", {
            method: methodRequest,
            content: 2,
            body: formData,
         });
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Não foi possível se conectar!",
            showConfirmButton: false,
            timer: 1500,
         });
      }
   }

   return (
      <>
         <div className="frm-container-row">
            <Input
               placeholder={"Busca"}
               id={"search"}
               maxLength={100}
               minLength={0}
               type={"text"}
               required={false}
               ref={search}
            />
            <button className="defaultButton" onClick={handleSearch}>
               {loading ? "Buscando..." : "Buscar"}
               {loading && <Loading />}
            </button>
         </div>
      </>
   );
};

export default World;
