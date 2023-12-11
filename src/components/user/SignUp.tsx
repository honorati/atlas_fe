import React, { useRef, useState } from "react";
import { CheckBox, CheckBoxRef } from "../form/Checkbox";
import { Input } from "../form/Input";
import "../../style/Modal.css";
import { Loading } from "../Loading";
import Swal from "sweetalert2";

interface SignUpFormProps {
   onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
   const [loading, setLoading] = useState<boolean>(false);
   const loginRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const emailRef = useRef<HTMLInputElement>(null);
   const emailRepeatRef = useRef<HTMLInputElement>(null);
   const passwordRepeatRef = useRef<HTMLInputElement>(null);
   const mailingRef = useRef<CheckBoxRef>(null);
   const notificationRef = useRef<CheckBoxRef>(null);

   const handleLoading = () => {
      setLoading(true);
   };

   const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoading();
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
            setLoading(false);
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "O login não pode conter espaços!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }

         if (!login || !password || !email || !passwordRepeat) {
            setLoading(false);
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Preencha todos os campos!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }

         if (password !== passwordRepeat) {
            setLoading(false);
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "As senhas não são iguais!",
               showConfirmButton: false,
               timer: 1500,
            });
            return;
         }

         if (email !== emailRepeat) {
            setLoading(false);
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Os e-mails não são iguais!",
               showConfirmButton: false,
               timer: 1500,
            });
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
            Swal.fire({
               icon: "warning",
               title: "Sucesso!",
               text: "Sua conta conta foi criada, valide seu e-mail!",
            });
            onClose();
         } else if (res.status === 400) {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Este login ou e-mail já estão sendo usados!",
            });
         } else {
            Swal.fire({
               icon: "error",
               title: "Ops!",
               text: "Não foi possível criar sua conta!",
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
      <form className="containerWhite" onSubmit={handleSignUp}>
         <h1>O gerenciador definitivo para sua campanha de RPG!</h1>
         <p>
            Tenha acesso a tudo que o Atlas do multiverso tem a oferecer, basta
            criar sua conta.
         </p>
         <Input
            type="text"
            placeholder="Como devemos te chamar? Não utilize espaços!"
            id="login"
            minLength={5}
            maxLength={15}
            ref={loginRef}
            required={true}
         />
         <Input
            type="email"
            placeholder="Qual seu e-mail?"
            id="email"
            minLength={5}
            maxLength={100}
            ref={emailRef}
            required={true}
         />
         <Input
            type="email"
            placeholder="Repita seu e-mail, tem que ser igualzinho!"
            id="emailRepeat"
            minLength={5}
            maxLength={100}
            ref={emailRepeatRef}
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
            {loading ? "Cadastrando..." : "Cadastrar"}
            {loading && <Loading />}
         </button>
      </form>
   );
};

export { SignUpForm };
