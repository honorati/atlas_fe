import React, { useRef } from "react";
import { CheckBox, CheckBoxRef } from "../form/Checkbox";
import { Text } from "../form/Text";
import swal from "sweetalert";
import "../../style/Modal.css";

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
   const loginRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const checkBoxRef = useRef<CheckBoxRef>(null);
   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      localStorage.clear();
      sessionStorage.clear();

      try {
         const login = loginRef.current?.value;
         const password = passwordRef.current?.value;

         if (!login || !password) {
            swal("Ops!", "Preencha todos os campos!", "error");
            return;
         }

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
            swal("Ops!", "Login ou senha inválidos!", "error");
         }
      } catch (error) {
         swal("Ops!", "Não foi possível se conectar!", "error");
      }
   };

   return (
      <form className="containerWhite" onSubmit={handleLogin}>
         <h1>Seja bem vindo!</h1>
         <p>
            Seja bem vindo ao Atlas do multiverso, para continuar, faça login.
         </p>
         <Text
            type="text"
            placeholder="Login ou e-mail"
            id="login"
            minLength={5}
            maxLength={100}
            ref={loginRef}
            required={true}
         />
         <Text
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
            Conectar
         </button>
      </form>
   );
};

export { SignInForm };
