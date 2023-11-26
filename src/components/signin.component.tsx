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
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkBoxRef = useRef<CheckBoxRef>(null);
  const [isModalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ login, password }),
        },
      );

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

  return (
    <div className=".modal">
      {isModalOpen && (
        <div>
          <CircleButton onClick={onClose} />
          <form className="containerWhite" onSubmit={handleSubmit}>
            <h1>Seja bem vindo!</h1>
            <p>
              Seja bem vindo ao Atlas do multiverso, para continuar, faça login.
            </p>
            <Text
              type="text"
              placeholder="Login"
              id="login"
              minLength={5}
              maxLength={100}
              ref={loginRef}
            />
            <Text
              type="password"
              placeholder="Senha"
              id="password"
              minLength={5}
              maxLength={100}
              ref={passwordRef}
            />
            <CheckBox
              ref={checkBoxRef}
              id="remember"
              label="Lembre-se de mim"
              initialValue="true"
            />
            <button className="defaultButton" type="submit">
              Conectar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export { SignIn };
