import { useState } from "react";
import swal from "sweetalert";
import { SignIn } from "./signin.component";
import { getStorage } from "../utils/getStorage";
import "../style/Menu.css";
import { ValidateUser } from "./validate-user.component";

const MainMenu = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

  console.error = (message) => {
    if (
      message.startsWith(
        "Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.",
      )
    ) {
      console.clear();
    }
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    getStorage("accessToken"),
  );

  const [userLogin, setUserLogin] = useState(getStorage("login"));
  const [userType, setUserType] = useState(getStorage("userType"));

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    setIsUserLoggedIn(getStorage("accessToken"));
    setUserLogin(getStorage("login"));
    setUserType(getStorage("userType"));
  };

  const openValidateModal = () => {
    setIsValidateModalOpen(true);
  };

  const closeValidateModal = () => {
    setIsValidateModalOpen(false);
    setIsUserLoggedIn(getStorage("accessToken"));
    setUserLogin(getStorage("login"));
    setUserType(getStorage("userType"));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    swal("Até mais!", "Você foi desconectado com sucesso!", "success");
    setIsUserLoggedIn(getStorage("accessToken"));
  };

  return (
    <div>
      <nav>
        <a>Início</a>
        <a href="#" className="dropdown">
          Mundos
          {isUserLoggedIn && (
            <div className="dropdown-content">
              <a>Meus Mundos</a>
            </div>
          )}
        </a>
        <a href="#" className="dropdown">
          Aventuras
          {isUserLoggedIn && (
            <div className="dropdown-content">
              <a className="dropdown-compact">Minhas aventuras</a>
            </div>
          )}
        </a>
        <a href="#" className="dropdown">
          Inimigos
          {isUserLoggedIn && (
            <div className="dropdown-content">
              <a>Meu bestiário</a>
            </div>
          )}
        </a>
        {isUserLoggedIn ? (
          <a className="dropdown">
            {userLogin}
            <div className="dropdown-content">
              <a>Perfil</a>
              {userType === "3" && <a>Administração</a>}
              {userType === "0" && <a onClick={openValidateModal}>Validar</a>}
              <a onClick={handleLogout}>Sair</a>
            </div>
          </a>
        ) : (
          <a onClick={openSignInModal}>Login</a>
        )}
        <div className="animation start-home"></div>
      </nav>
      <div>{isSignInModalOpen && <SignIn onClose={closeSignInModal} />}</div>

      <div>
        {isValidateModalOpen && <ValidateUser onClose={closeValidateModal} />}
      </div>
    </div>
  );
};

export default MainMenu;
