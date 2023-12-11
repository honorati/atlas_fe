import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../form/Input";
import { WYSIWIG } from "../form/WYSIWIG";
import useFetch from "../../hooks/useFetch";
import MiniUpload from "../form/MiniUpload";
import "../../style/Form.css";

const City = () => {
   const { paramId } = useParams();
   const [description, setDescription] = useState<string | null>(null);
   const name = useRef<HTMLInputElement>(null);
   const title = useRef<HTMLInputElement>(null);
   const [imageMap, setImageMap] = useState<File | null>(null);
   const { fetchData } = useFetch();

   const handleWysiwigChange = (data: string) => {
      setDescription(data);
   };

   const handleUpload = (file: File | null) => {
      setImageMap(file);
   };

   function handleCRUD(event: React.FormEvent) {
      event.preventDefault();

      const methodRequest = paramId ? "PATCH" : "POST";
      const body = JSON.stringify({
         uniqueId: paramId || undefined,
         name: name.current?.value || "",
         title: title.current?.value || "",
         description,
         imageMap,
      });
      try {
         fetchData("/world", { method: methodRequest, body })
            .then(({ data, status }) => {
               if (status === 200) {
                  // Lógica para lidar com a resposta bem-sucedida
                  console.log("Dados da API:", data);
               } else {
                  // Lógica para lidar com erros ou códigos de status diferentes
                  console.error(
                     "Erro na requisição. Código de status:",
                     status,
                  );
               }
            })
            .catch((error) => {
               // Lógica para lidar com o erro
               console.error("Erro na requisição:", error.message);
            });
      } catch (error) {
         console.error("Erro na requisição:");
      }
   }

   return (
      <>
         <form onSubmit={handleCRUD}>
            <h1>Crie Seu Mundo</h1>
            <p>
               Explore novas possibilidades e dê vida ao seu próprio universo.
               Preencha os detalhes abaixo para começar.
            </p>
            <div className="frm-container">
               <div className="frm-container-column">
                  <MiniUpload
                     id={"image"}
                     alt={"World Preview"}
                     fileSize={3}
                     onFileChange={handleUpload}
                  />
               </div>
               <div className="frm-container-column">
                  <Input
                     placeholder={"Nome da cidade"}
                     id={"name"}
                     maxLength={100}
                     minLength={2}
                     type={"text"}
                     required={true}
                     ref={name}
                  />
                  <Input
                     placeholder={"Título da cidade"}
                     id={"title"}
                     maxLength={255}
                     minLength={2}
                     type={"text"}
                     required={false}
                     ref={title}
                  />
               </div>
            </div>
            <WYSIWIG
               initialValue="Descrição"
               id="description"
               onDataChange={handleWysiwigChange}
            />
            <button className="defaultButton" type="submit">
               Salvar
            </button>
         </form>
      </>
   );
};

export default City;
