import React, { useRef, useState } from "react";
import { CheckBox, CheckBoxRef } from "../form/Checkbox";
import { Input } from "../form/Input";
import "../../style/Modal.css";
import { Loading } from "../Loading";
import Swal from "sweetalert2";

interface SignInFormProps {
   openSignUpModal: () => void;
   openForgotModal: () => void;
   onClose: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
   openSignUpModal,
   openForgotModal,
   onClose,
}) => {
   const [loading, setLoading] = useState<boolean>(false);
   const loginRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const checkBoxRef = useRef<CheckBoxRef>(null);

   const handleLoading = () => {
      setLoading(true);
   };

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLoading();
      localStorage.clear();
      sessionStorage.clear();

      const login = loginRef.current?.value;
      const password = passwordRef.current?.value;

      if (!login || !password) {
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

      try {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
            headers: {
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ login, password }),
         });

         if (res.status === 201) {
            const data = await res.json();
            if (checkBoxRef.current?.getValue() === "false") {
               sessionStorage.setItem("accessToken", data.accessToken);
               sessionStorage.setItem("login", data.user.login);
               sessionStorage.setItem("userType", data.user.type);
            } else {
               localStorage.setItem("accessToken", data.accessToken);
               localStorage.setItem("login", data.user.login);
               localStorage.setItem("userType", data.user.type);
            }
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
               text: "Login ou senha inválidas!",
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
         onClose();
      }

      setLoading(false);
   };

   return (
      <form className="containerWhite" onSubmit={handleLogin}>
         <h1>Seja bem vindo!</h1>
         <p>
            Seja bem vindo ao Atlas do multiverso, para continuar, faça login.
         </p>
         <Input
            type="text"
            placeholder="Login ou e-mail"
            id="login"
            minLength={5}
            maxLength={100}
            ref={loginRef}
            required={true}
         />
         <Input
            type="password"
            placeholder="Senha"
            id="password"
            minLength={5}
            maxLength={100}
            ref={passwordRef}
            required={true}
         />
         <CheckBox
            ref={checkBoxRef}
            id="remember"
            label="Lembre-se de mim"
            initialValue="true"
         />
         <div className="row-content">
            <a onClick={openSignUpModal} className="option">
               Não tenho uma conta
            </a>
            <a onClick={openForgotModal} className="option">
               Esqueci minha senha
            </a>
         </div>
         <button className="defaultButton" type="submit">
            {loading ? "Conectando..." : "Conectar"}
            {loading && <Loading />}
         </button>
      </form>
   );
};

export { SignInForm };
