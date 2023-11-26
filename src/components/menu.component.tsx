import { useState } from "react";
import swal from "sweetalert";
import { SignIn } from "./signin.component";
import { getStorage } from "../utils/getStorage";
import "../style/Menu.css";

const MainMenu = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    setIsUserLoggedIn(getStorage("accessToken"));
    setUserLogin(getStorage("login"));
  };

  const openSignUpModal = () => {
    if (isSignUpModalOpen) {
      setIsSignUpModalOpen(false);
    }
    setIsSignUpModalOpen(true);
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
        <a>Home</a>
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
              <a onClick={handleLogout}>Sair</a>
            </div>
          </a>
        ) : (
          <a className="dropdown">
            Acesso
            <div className="dropdown-content">
              <a onClick={openSignInModal}>Login</a>
              <a onClick={openSignUpModal}>Cadatre-se</a>
            </div>
          </a>
        )}
        <div className="animation start-home"></div>
      </nav>
      {isSignInModalOpen && <SignIn onClose={closeSignInModal} />}
    </div>
  );
};

export default MainMenu;
