import React, { useRef, useState, DragEvent } from "react";
import Swal from "sweetalert2";

interface Props {
   id: string;
   alt: string;
   fileSize: number;
   onFileChange: (file: File | null) => void;
}

const MiniUpload: React.FC<Props> = (props) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [image, setImage] = useState<string>();
   const [dragOver, setDragOver] = useState<boolean>(false);

   const handleFile = (selectedFile: File) => {
      if (selectedFile.size <= props.fileSize * 1024 * 1024) {
         props.onFileChange(selectedFile);
         setImage(URL.createObjectURL(selectedFile));
      } else {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: `A imagem deve ter no máximo ${props.fileSize} MB!`,
            showConfirmButton: false,
            timer: 1500,
         });
         props.onFileChange(null);
      }
   };

   const handleClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
         handleFile(event.target.files[0]);
      }
   };

   const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
   };

   const handleDragLeave = () => {
      setDragOver(false);
   };

   const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);

      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
         handleFile(event.dataTransfer.files[0]);
      }
   };

   return (
      <div
         className={`mini-container-preview ${dragOver ? "drag-over" : ""}`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         onClick={handleClick}
      >
         {image ? (
            <img
               className="mini-image-preview"
               src={image}
               alt={props.alt}
               style={{ cursor: "pointer" }}
            />
         ) : (
            <>
               <img src="/miniUpload.png" alt="upload" draggable="false" />
               <p>Arraste a imagem para fazer o upload</p>
               <button type="button" className="defaultButton">
                  Procure o arquivo
               </button>
               <p>Tamanho máximo de {props.fileSize} MB</p>
            </>
         )}
         <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
         />
      </div>
   );
};

export default MiniUpload;
