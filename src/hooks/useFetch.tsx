import { useEffect, useState } from "react";
import { getStorage } from "../utils/getStorage";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: object;
};

type UseFetchResult = {
  data: object | null;
  status: number | null;
};

const useFetch = (url: string, options: FetchOptions = {}): UseFetchResult => {
  const [data, setData] = useState<object | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_API_URL + url,
          {
            method: options.method || "GET",
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
              Authorization: getStorage("accessToken") || "",
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
          },
        );

        setStatus(response.status); // Definir o status da resposta

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, options.method, options.headers, options.body]);

  return { data, status };
};

export { useFetch };
