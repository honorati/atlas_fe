import React, { useRef, useState } from "react";
import { Input } from "../form/Input";
import "../../style/Modal.css";
import { CircleButton } from "../CloseButton";
import { getStorage } from "../../utils/getStorage";
import { Loading } from "../Loading";
import Swal from "sweetalert2";

interface ModalProps {
   onClose: () => void;
}

const ValidateUser: React.FC<ModalProps> = ({ onClose }) => {
   const [loading, setLoading] = useState<boolean>(false);
   const codeRef = useRef<HTMLInputElement>(null);
   const [isModalOpen, setModalOpen] = useState(true);

   const handleLoading = () => {
      setLoading(true);
   };

   const closeModal = () => {
      setModalOpen(false);
      onClose();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoading();
      try {
         const activation = codeRef.current?.value;

         if (!activation) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Preencha todos os campos!",
               showConfirmButton: false,
               timer: 1500,
            });
            setLoading(false);
            return;
         }
         const token = getStorage("accessToken");

         const res = await fetch(
            import.meta.env.VITE_API_URL + "/user/validate",
            {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: token || "",
               },
               method: "PATCH",
               body: JSON.stringify({ activation: activation }),
            },
         );

         if (res.status === 404) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Não foi possível se conectar!",
               showConfirmButton: false,
               timer: 1500,
            });
         } else if (res.ok) {
            const data = await res.json();
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("login", data.user.login);
            localStorage.setItem("userType", data.user.type);
            Swal.fire({
               icon: "warning",
               title: "Sucesso!",
               text: "Sua conta não foi validada ainda, nem todas as funções estão liberadas!",
               showConfirmButton: false,
               timer: 1500,
            });
            closeModal();
         } else {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Código inválido!",
               showConfirmButton: false,
               timer: 1500,
            });
         }
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Não foi possível se conectar!",
            showConfirmButton: false,
            timer: 1500,
         });
      }
      setLoading(false);
   };

   return (
      <div className="modal">
         {isModalOpen && (
            <div>
               <CircleButton onClick={onClose} />
               <form className="containerWhite" onSubmit={handleSubmit}>
                  <h1>Validação de conta!</h1>
                  <p>Insira o código de validação recebida por e-mail.</p>
                  <Input
                     type="text"
                     placeholder="Código de validação"
                     id="code"
                     minLength={5}
                     maxLength={100}
                     ref={codeRef}
                     required={true}
                  />
                  <button className="defaultButton" type="submit">
                     {loading ? "Validando..." : "Validar"}
                     {loading && <Loading />}
                  </button>
               </form>
            </div>
         )}
      </div>
   );
};
export { ValidateUser };
