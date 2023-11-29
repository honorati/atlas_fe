import React, { useRef } from "react";
import { Text } from "../input/Text";
import swal from "sweetalert";
import "../../style/Modal.css";

interface RecoverPasswordFormProps {
   onClose: () => void;
}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = ({
   onClose,
}) => {
   const recoverRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const passwordRepeatRef = useRef<HTMLInputElement>(null);

   const handleRecover = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      try {
         const recover = recoverRef.current?.value;
         const password = passwordRef.current?.value;
         const passwordRepeat = passwordRepeatRef.current?.value;

         if (!recover || !password || !passwordRepeat) {
            swal("Ops!", "Preencha todos os campos!", "error");
            return;
         }

         if (password !== passwordRepeat) {
            swal("Ops!", "As senhas não são iguais!", "error");
            return;
         }

         const res = await fetch(
            `${import.meta.env.VITE_API_URL}/user/secret`,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify({
                  recoveryLink: recover,
                  password: password,
               }),
            },
         );

         if (res.status === 201) {
            const data = await res.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("login", data.user.login);
            localStorage.setItem("userType", data.user.type);
            if (data.user.type === 0) {
               swal(
                  "Sucesso!",
                  "Sua conta não foi validada ainda, nem todas as funções estão liberadas!",
                  "warning",
               );
               onClose();
            } else {
               swal("Sucesso!", "Bem vindo de volta cartógrafo!", "success");
               onClose();
            }
         } else {
            swal("Ops!", "Frase secreta inválida!", "error");
         }
      } catch (error) {
         swal("Ops!", "Não foi possível se conectar!", "error");
      }
   };

   return (
      <form className="containerWhite" onSubmit={handleRecover}>
         <h1>Recuperação de conta!</h1>
         <p>
            Verifique seu e-mail, caso não tenha recebido nada, valide os dados
            anteriormente inseridos.
         </p>
         <Text
            type="text"
            placeholder="Frase secreta recebida por e-mail"
            id="recover"
            minLength={5}
            maxLength={255}
            ref={recoverRef}
            required={true}
         />
         <Text
            type="password"
            placeholder="Insira uma senha"
            id="password"
            minLength={5}
            maxLength={100}
            ref={passwordRef}
            required={true}
         />
         <Text
            type="password"
            placeholder="Repita sua senha, tem que ser igualzinha!"
            id="repeatPassword"
            minLength={5}
            maxLength={100}
            ref={passwordRepeatRef}
            required={true}
         />
         <button className="defaultButton" type="submit">
            Recuperar
         </button>
      </form>
   );
};

export { RecoverPasswordForm };
