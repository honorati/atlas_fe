import React, { useRef, useState } from "react";
import { Input } from "../form/Input";
import "../../style/Modal.css";
import { Loading } from "../Loading";
import Swal from "sweetalert2";

interface RecoverPasswordFormProps {
   onClose: () => void;
}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = ({
   onClose,
}) => {
   const [loading, setLoading] = useState<boolean>(false);
   const recoverRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const passwordRepeatRef = useRef<HTMLInputElement>(null);

   const handleLoading = () => {
      setLoading(true);
   };

   const handleRecover = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      try {
         const recover = recoverRef.current?.value;
         const password = passwordRef.current?.value;
         const passwordRepeat = passwordRepeatRef.current?.value;

         if (!recover || !password || !passwordRepeat) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Login ou senha inválidas!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }

         if (password !== passwordRepeat) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "As senhas não são iguais!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }
         handleLoading();
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
               Swal.fire({
                  icon: "warning",
                  title: "Sucesso!",
                  text: "Sua conta não foi validada ainda, nem todas as funções estão liberadas!",
                  showConfirmButton: false,
                  timer: 1500,
               });
               onClose();
            } else {
               Swal.fire({
                  icon: "success",
                  title: "Sucesso!",
                  text: "Bem vindo de volta cartógrafo!",
                  showConfirmButton: false,
                  timer: 1500,
               });
               onClose();
            }
         } else {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Frase secreta inválida!",
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
   };

   return (
      <form className="containerWhite" onSubmit={handleRecover}>
         <h1>Recuperação de conta!</h1>
         <p>
            Verifique seu e-mail, caso não tenha recebido nada, valide os dados
            anteriormente inseridos.
         </p>
         <Input
            type="text"
            placeholder="Frase secreta recebida por e-mail"
            id="recover"
            minLength={5}
            maxLength={255}
            ref={recoverRef}
            required={true}
         />
         <Input
            type="password"
            placeholder="Insira uma senha"
            id="password"
            minLength={5}
            maxLength={100}
            ref={passwordRef}
            required={true}
         />
         <Input
            type="password"
            placeholder="Repita sua senha, tem que ser igualzinha!"
            id="repeatPassword"
            minLength={5}
            maxLength={100}
            ref={passwordRepeatRef}
            required={true}
         />
         <button className="defaultButton" type="submit">
            {loading ? <Loading /> : "Recuperar"}
         </button>
      </form>
   );
};

export { RecoverPasswordForm };
