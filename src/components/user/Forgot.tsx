import React, { useRef } from "react";
import { Input } from "../form/Input";
import "../../style/Modal.css";
import Swal from "sweetalert2";

interface ForgotPasswordFormProps {
   openRecoverModal: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
   openRecoverModal,
}) => {
   const recoverRef = useRef<HTMLInputElement>(null);

   const handleForgot = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      try {
         const recover = recoverRef.current?.value;

         if (!recover) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Preencha todos os campos!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }

         await fetch(`${import.meta.env.VITE_API_URL}/user/recover`, {
            headers: {
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email: recover }),
         });
         openRecoverModal();
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: "Ops!",
            text: "Login ou senha inválidas!",
            showConfirmButton: false,
            timer: 1500,
         });
      }
   };

   return (
      <form className="containerWhite" onSubmit={handleForgot}>
         <h1>Recuperação de conta!</h1>
         <p>Insira o login ou e-mail da conta que deseja recuperar a senha.</p>
         <Input
            type="text"
            placeholder="Login ou e-mail da conta cadastrada!"
            id="login"
            minLength={5}
            maxLength={100}
            ref={recoverRef}
            required={true}
         />
         <button className="defaultButton" type="submit">
            Recuperar
         </button>
      </form>
   );
};

export { ForgotPasswordForm };
