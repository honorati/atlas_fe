import React, { useRef, useState } from "react";
import { CheckBox, CheckBoxRef } from "./input-checkbox";
import { Text } from "./input-text";
import swal from "sweetalert";
import "../style/Modal.css";
import { CircleButton } from "./close-button.component";

interface ModalProps {
  onClose: () => void;
}

const SignIn: React.FC<ModalProps> = ({ onClose }) => {
  //signIn
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkBoxRef = useRef<CheckBoxRef>(null);
  // SignUp
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailRepeatRef = useRef<HTMLInputElement>(null);
  const mailingRef = useRef<CheckBoxRef>(null);
  const notificationRef = useRef<CheckBoxRef>(null);
  // Forgot
  const recoverRef = useRef<HTMLInputElement>(null);

  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isRecoverOpen, setIsRecoverOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setLoginOpen(false);
  };

  const openForgotModal = () => {
    setIsForgotOpen(true);
    setLoginOpen(false);
  }

  const closeModal = () => {
    setLoginOpen(false);
    onClose();
  };

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
          closeModal();
        } else {
          swal("Sucesso!", "Bem vindo de volta cartógrafo!", "success");
          closeModal();
        }
      } else {
        swal("Ops!", "Login ou senha inválidos!", "error");
      }
    } catch (error) {
      swal("Ops!", "Não foi possível se conectar!", "error");
    }
  };

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
        closeModal();
      } else if (res.status === 400) {
        swal("Ops!", "Este login ou e-mail já estão sendo usados!", "error");
      } else {
        swal("Ops!", "Não foi possível criar sua conta!", "error");
      }
    } catch (error) {
      swal("Ops!", "Não foi possível se conectar!", "error");
    }
  };

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
        setIsRecoverOpen(true);
        setIsForgotOpen(false);
    } catch (error) {
      swal("Ops!", "Não foi possível se conectar!", "error");
    }
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
        swal("Ops!", "Preencha todos os campos!", "error");
        return;
      }

      if (password !== passwordRepeat) {
        swal("Ops!", "As senhas não são iguais!", "error");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/secret`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ recoveryLink : recover, password : password }),
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
          closeModal();
        } else {
          swal("Sucesso!", "Bem vindo de volta cartógrafo!", "success");
          closeModal();
        }
      } else {
        swal("Ops!", "Frase secreta inválida!", "error");
      }
    } catch (error) {
      swal("Ops!", "Não foi possível se conectar!", "error");
    }
  };


  return (
    <div className="modal">
      {isLoginOpen && (
        <div>
          <CircleButton onClick={onClose} />
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
              <a onClick={openForgotModal} className="option">Esqueci minha senha</a>
              <a onClick={openSignUpModal} className="option">
                Não tenho uma conta
              </a>
            </div>
            <button className="defaultButton" type="submit">
              Conectar
            </button>
          </form>
        </div>
      )}
      {isSignUpOpen && (
        <div>
          <CircleButton onClick={onClose} />
          <form className="containerWhite" onSubmit={handleSignUp}>
            <h1>O gerenciador definitivo para sua campanha de RPG!</h1>
            <p>
              Tenha acesso a tudo que o Atlas do multiverso tem a oferecer,
              basta criar sua conta.
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
        </div>
      )}
      {isForgotOpen && (
        <div>
          <CircleButton onClick={onClose} />
          <form className="containerWhite" onSubmit={handleForgot}>
            <h1>Recuperação de conta!</h1>
            <p>
              Insira o login ou e-mail da conta que deseja recuperar a senha.
            </p>
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
        </div>
      )}
      {isRecoverOpen && (
        <div>
          <CircleButton onClick={onClose} />
          <form className="containerWhite" onSubmit={handleRecover}>
            <h1>Recuperação de conta!</h1>
            <p>
              Verifique seu e-mail, caso não tenha recebido nada, valide os dados anteriormente inseridos.
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
        </div>
      )}
    </div>
  );
};
export { SignIn };
