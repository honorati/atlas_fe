import React, { useRef } from "react";
import { CheckBox, CheckBoxRef } from "../form/Checkbox";
import { Text } from "../form/Text";
import swal from "sweetalert";
import "../../style/Modal.css";

interface SignUpFormProps {
   onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
   const loginRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const emailRef = useRef<HTMLInputElement>(null);
   const emailRepeatRef = useRef<HTMLInputElement>(null);
   const passwordRepeatRef = useRef<HTMLInputElement>(null);
   const mailingRef = useRef<CheckBoxRef>(null);
   const notificationRef = useRef<CheckBoxRef>(null);

   const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      try {
         const login = loginRef.current?.value;
         const password = passwordRef.current?.value;
         const email = emailRef.current?.value;
         const emailRepeat = emailRepeatRef.current?.value;
         const passwordRepeat = passwordRepeatRef.current?.value;
         const mailing = mailingRef.current?.getValue() === "true" ? 1 : 0;
         const notification =
            notificationRef.current?.getValue() === "true" ? 1 : 0;

         if (login?.search(" ") !== -1) {
            swal("Ops!", "O login não pode conter espaços!", "error");
            return;
         }

         if (!login || !password || !email || !passwordRepeat) {
            swal("Ops!", "Preencha todos os campos!", "error");
            return;
         }

         if (password !== passwordRepeat) {
            swal("Ops!", "As senhas não são iguais!", "error");
            return;
         }

         if (email !== emailRepeat) {
            swal("Ops!", "Os e-mails não são iguais!", "error");
            return;
         }
         const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
               login,
               password,
               email,
               mailing,
               notification,
            }),
         });
         if (res.status === 201) {
            const data = await res.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("login", data.user.login);
            localStorage.setItem("userType", data.user.type);
            swal(
               "Sucesso!",
               "Sua conta conta foi criada, valide seu e-mail!",
               "warning",
            );
            onClose();
         } else if (res.status === 400) {
            swal(
               "Ops!",
               "Este login ou e-mail já estão sendo usados!",
               "error",
            );
         } else {
            swal("Ops!", "Não foi possível criar sua conta!", "error");
         }
      } catch (error) {
         swal("Ops!", "Não foi possível se conectar!", "error");
      }
   };

   return (
      <form className="containerWhite" onSubmit={handleSignUp}>
         <h1>O gerenciador definitivo para sua campanha de RPG!</h1>
         <p>
            Tenha acesso a tudo que o Atlas do multiverso tem a oferecer, basta
            criar sua conta.
         </p>
         <Text
            type="text"
            placeholder="Como devemos te chamar? Não utilize espaços!"
            id="login"
            minLength={5}
            maxLength={15}
            ref={loginRef}
            required={true}
         />
         <Text
            type="email"
            placeholder="Qual seu e-mail?"
            id="email"
            minLength={5}
            maxLength={100}
            ref={emailRef}
            required={true}
         />
         <Text
            type="email"
            placeholder="Repita seu e-mail, tem que ser igualzinho!"
            id="emailRepeat"
            minLength={5}
            maxLength={100}
            ref={emailRepeatRef}
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
         <CheckBox
            id="mailing"
            label="Quero receber novidades por email"
            ref={mailingRef}
         />
         <CheckBox
            id="notification"
            label="Quero receber notificações por email"
            ref={notificationRef}
         />
         <button className="defaultButton" type="submit">
            Cadastrar
         </button>
      </form>
   );
};

export { SignUpForm };
