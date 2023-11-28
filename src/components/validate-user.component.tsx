import React, { useRef, useState } from "react";
import { Text } from "./input-text";
import swal from "sweetalert";
import "../style/Modal.css";
import { CircleButton } from "./close-button.component";
import { getStorage } from "../utils/getStorage";

interface ModalProps {
  onClose: () => void;
}

const ValidateUser: React.FC<ModalProps> = ({ onClose }) => {
  const codeRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const activation = codeRef.current?.value;

      if (!activation) {
        swal("Ops!", "Preencha todos os campos!", "error");
        return;
      }
      const token = getStorage("accessToken");

      const res = await fetch(import.meta.env.VITE_API_URL + "/user/validate", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        method: "PATCH",
        body: JSON.stringify({ activation: activation }),
      });

      if (res.status === 404) {
        swal("Ops!", "Não foi possível se conectar!", "error");
      } else if (res.ok) {
        const data = await res.json();
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("login", data.user.login);
        localStorage.setItem("userType", data.user.type);
        swal(
          "Sucesso!",
          "Sua conta foi validada, todas as funções estão liberadas!",
          "success",
        );
        closeModal();
      } else {
        swal("Ops!", "Código inválido!", "error");
      }
    } catch (error) {
      swal("Ops!", "Não foi possível se conectar!", "error");
    }
  };

  return (
    <div className="modal">
      {isModalOpen && (
        <div>
          <CircleButton onClick={onClose} />
          <form className="containerWhite" onSubmit={handleSubmit}>
            <h1>Validação de conta!</h1>
            <p>Insira o código de validação recebida por e-mail.</p>
            <Text
              type="text"
              placeholder="Código de validação"
              id="code"
              minLength={5}
              maxLength={100}
              ref={codeRef}
              required={true}
            />
            <button className="defaultButton" type="submit">
              Validar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export { ValidateUser };
