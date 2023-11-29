import React from "react";
import "../style/CloseButton.css";

interface ButtonProps {
   onClick: () => void;
}

const CircleButton: React.FC<ButtonProps> = ({ onClick }) => {
   return <button onClick={onClick} className="button-circle" />;
};

export { CircleButton };
