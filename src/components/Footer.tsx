import React from "react";

const Footer: React.FC = () => {
   const year = new Date().getFullYear();
   return (
      <footer>
         <p>
            &copy; {year} Atlas do Multiverso - Made by{" "}
            <a
               style={{ color: "#995D21" }}
               href="https://linktr.ee/bruno.honorato"
               target="_blank"
            >
               Bruno Honorato
            </a>{" "}
            - Design by{" "}
            <a
               style={{ color: "#995D21" }}
               href="https://linktr.ee/betocorreajr"
               target="_blank"
            >
               Beto Correia Jr
            </a>
         </p>
      </footer>
   );
};

export { Footer };
