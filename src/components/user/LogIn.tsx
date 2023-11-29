import React, { useState } from "react";
import { CircleButton } from "../CloseButton";
import { SignInForm } from "./SignIn";
import { SignUpForm } from "./SignUp";
import { ForgotPasswordForm } from "./Forgot";
import { RecoverPasswordForm } from "./Recover";

interface ModalProps {
   onClose: () => void;
}

const LogIn: React.FC<ModalProps> = ({ onClose }) => {
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
   };

   const openRecoverModal = () => {
      setIsRecoverOpen(true);
      setIsForgotOpen(false);
   };

   const closeModal = () => {
      setLoginOpen(false);
      onClose();
   };

   return (
      <div className="modal">
         {isLoginOpen && (
            <div>
               <CircleButton onClick={onClose} />
               <SignInForm
                  openSignUpModal={openSignUpModal}
                  openForgotModal={openForgotModal}
                  onClose={closeModal}
               />
            </div>
         )}
         {isSignUpOpen && (
            <div>
               <CircleButton onClick={onClose} />
               <SignUpForm onClose={closeModal} />
            </div>
         )}
         {isForgotOpen && (
            <div>
               <CircleButton onClick={onClose} />
               <ForgotPasswordForm openRecoverModal={openRecoverModal} />
            </div>
         )}
         {isRecoverOpen && (
            <div>
               <CircleButton onClick={onClose} />
               <RecoverPasswordForm onClose={closeModal} />
            </div>
         )}
      </div>
   );
};

export { LogIn };
