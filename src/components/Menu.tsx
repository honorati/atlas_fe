import { useState } from "react";
import { getStorage } from "../utils/getStorage";
import { ValidateUser } from "./user/Validate";
import { LogIn } from "./user/LogIn";
import swal from "sweetalert";
import "../style/Menu.css";

const MainMenu = () => {
   const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
   const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

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
            <a>Home</a>
            <a href="#" className="dropdown">
               Mundos
               {isUserLoggedIn && (
                  <div className="dropdown-content">
                     <a className="submenu">Meus Mundos</a>
                  </div>
               )}
            </a>
            <a href="#" className="dropdown">
               Aventuras
               {isUserLoggedIn && (
                  <div className="dropdown-content">
                     <a className="submenu">Minhas aventuras</a>
                  </div>
               )}
            </a>
            <a href="#" className="dropdown">
               Inimigos
               {isUserLoggedIn && (
                  <div className="dropdown-content">
                     <a className="submenu">Meu bestiário</a>
                  </div>
               )}
            </a>
            {isUserLoggedIn ? (
               <a className="dropdown">
                  {userLogin}
                  <div className="dropdown-content">
                     <a className="submenu">Perfil</a>
                     {userType === "3" && (
                        <a className="submenu">Administração</a>
                     )}
                     {userType === "0" && (
                        <a onClick={openValidateModal} className="submenu">
                           Validar
                        </a>
                     )}
                     <a onClick={handleLogout} className="submenu">
                        Sair
                     </a>
                  </div>
               </a>
            ) : (
               <a onClick={openSignInModal}>Login</a>
            )}
            <div className="animation start-home"></div>
         </nav>
         <div>{isSignInModalOpen && <LogIn onClose={closeSignInModal} />}</div>

         <div>
            {isValidateModalOpen && (
               <ValidateUser onClose={closeValidateModal} />
            )}
         </div>
      </div>
   );
};

export default MainMenu;
