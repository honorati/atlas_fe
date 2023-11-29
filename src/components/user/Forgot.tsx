import React, { useRef } from "react";
import { Text } from "../input/Text";
import swal from "sweetalert";
import "../../style/Modal.css";

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
            swal("Ops!", "Preencha todos os campos!", "error");
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
         swal("Ops!", "Não foi possível se conectar!", "error");
      }
   };

   return (
      <form className="containerWhite" onSubmit={handleForgot}>
         <h1>Recuperação de conta!</h1>
         <p>Insira o login ou e-mail da conta que deseja recuperar a senha.</p>
         <Text
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
