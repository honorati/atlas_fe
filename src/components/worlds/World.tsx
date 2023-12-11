import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../form/Input";
import { WYSIWIG } from "../form/WYSIWIG";
import useFetch from "../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import Upload from "../form/Upload";
import { Loading } from "../Loading";
import Swal from "sweetalert2";
import "../../style/Form.css";
import { getStorage } from "../../utils/getStorage";

interface WorldData {
   name: string;
   title: string;
   description: string;
   imageMap: File | null;
   userLogin: string;
}
const World = () => {
   const { pid } = useParams();
   const { fetchData, loading } = useFetch();
   const [view, setView] = useState<boolean>(false);
   const [dataFetched, setDataFetched] = useState<boolean>(false);
   const [canEdit, setCanEdit] = useState<boolean>(false);
   const [description, setDescription] = useState<string | null>(null);
   const [imageMap, setImageMap] = useState<File | null>(null);
   const [viewName, setViewName] = useState<string | null>(null);
   const [viewTitle, setViewTitle] = useState<string | null>(null);
   const name = useRef<HTMLInputElement>(null);
   const title = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (pid && !dataFetched) {
         setView(true);
         const fetchDataAndPopulateState = async () => {
            if (pid) {
               try {
                  const response = await fetchData(
                     `/world?id=${encodeURIComponent(pid)}`,
                  );

                  if (response) {
                     const data = (await response.data) as WorldData;
                     console.log(data);
                     setViewName(data?.name ?? "");
                     setViewTitle(data?.title ?? "");
                     setDescription(data?.description ?? "");
                     setImageMap(data?.imageMap);
                     setCanEdit(
                        data?.userLogin == getStorage("login") ? true : false,
                     );
                  }
               } catch (error) {
                  Swal.fire({
                     icon: "error",
                     title: "Ops!",
                     text: "Não foi possível carregar os dados!",
                     showConfirmButton: false,
                     timer: 9500,
                  });
               }
            }
            setDataFetched(true);
         };

         fetchDataAndPopulateState();
      }
   }, [dataFetched, fetchData, pid]);

   const handleView = () => {
      setView(false);
   };

   const handleSuccess = (data: boolean) => {
      if (data) {
         Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Seu mundo foi criado com sucesso!",
            showConfirmButton: false,
            timer: 1500,
         });
      } else {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Não foi possível salvar!",
            showConfirmButton: false,
            timer: 1500,
         });
      }
   };

   const handleWysiwigChange = (data: string) => {
      setDescription(data);
   };

   const handleUpload = (file: File | null) => {
      setImageMap(file);
   };

   function handleCRUD(event: React.FormEvent) {
      event.preventDefault();

      const methodRequest = pid ? "PATCH" : "POST";
      const formData = new FormData();
      if (pid) {
         formData.append("id", pid);
      } else {
         formData.append("uniqueId", uuidv4());
      }
      formData.append("name", name.current?.value || "");
      formData.append("title", title.current?.value || "");
      formData.append("description", description || "");

      if (imageMap) {
         formData.append("imageMap", imageMap);
      }

      try {
         fetchData("/world", {
            method: methodRequest,
            content: 2,
            body: formData,
         })
            .then(({ status }) => {
               if (status === 201) {
                  handleSuccess(true);
               } else {
                  handleSuccess(false);
               }
            })
            .catch((error) => {
               console.error("Erro na requisição:", error.message);
            });
      } catch (error) {
         console.error("Erro na requisição:");
      }
   }

   return (
      <>
         {view ? (
            <div className="frm-container">
               <h1>{viewName}</h1>
               <h2>{viewTitle}</h2>
               <div
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                  className="frm-container-column"
               />
               {canEdit && (
                  <button className="defaultButton" onClick={handleView}>
                     Editar
                  </button>
               )}
            </div>
         ) : (
            <form className="frm-container" onSubmit={handleCRUD}>
               <h1>Crie seu mundo</h1>
               <p>
                  Explore novas possibilidades e dê vida ao seu próprio
                  universo. Preencha os detalhes abaixo para começar.
               </p>
               <div className="frm-container-column">
                  <Input
                     placeholder={"Nome do mundo"}
                     id={"name"}
                     maxLength={100}
                     minLength={2}
                     type={"text"}
                     required={true}
                     ref={name}
                     initialValue={viewName ? viewName : ""}
                  />
                  <Input
                     placeholder={"Título do mundo"}
                     id={"title"}
                     maxLength={255}
                     minLength={2}
                     type={"text"}
                     required={false}
                     ref={title}
                     initialValue={viewTitle ? viewTitle : ""}
                  />
                  <WYSIWIG
                     id="description"
                     onDataChange={handleWysiwigChange}
                     initialValue={
                        description ? description : "Descrição de seu mundo"
                     }
                  />
                  <Upload
                     id={"image"}
                     alt={"World Preview"}
                     fileSize={3}
                     onFileChange={handleUpload}
                  />
                  <button className="defaultButton" type="submit">
                     {loading ? "Salvando..." : "Salvar"}
                     {loading && <Loading />}
                  </button>
               </div>
            </form>
         )}
      </>
   );
};

export default World;
