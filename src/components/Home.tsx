import React from "react";

const Home: React.FC = () => {
   return (
      <>
         <div className="container-centralized">
            <img src="/logo.png" alt="Atlas do Multiverso" className="logo" />
            <hr className="gradient-line" />
            <h1>O gerenciador definitivo para</h1>
            <h1>sua campanha de RPG!</h1>
            <hr className="gradient-line" />
            <div className="container">
               <div className="text-left">
                  <h2>Crie seus mundos</h2>
                  <p>
                     O Atlas do Multiverso é uma plataforma online para
                     gerenciamento de campanhas de RPG. Crie e gerencie mundos,
                     reinos, cidades, dungeons e muito mais!
                  </p>
               </div>
               <div className="frame-right">
                  <img src="/img1.jpg" alt="Mundos" className="image-right" />
               </div>
            </div>
            <div className="container">
               <div className="frame-left">
                  <img src="/img2.jpg" alt="Aventuras" className="image-left" />
               </div>
               <div className="text-right">
                  <h2>Organize suas aventuras</h2>
                  <p>
                     Crie e gerencie suas aventuras de RPG de forma rápida e
                     fácil. Adicione personagens, locais, itens e muito mais!
                  </p>
               </div>
            </div>
            <div className="container">
               <div className="text-left">
                  <h2>Crie seus inimigos e oponentes!</h2>
                  <p>
                     Inimigos poderosos, hordas gisgantescas, sangue e
                     destruição para todos os lados! Crie seus monstros e
                     compartilhe com a comunidade!
                  </p>
               </div>
               <div className="frame-right">
                  <img
                     src="/img3.jpg"
                     alt="Bestiario"
                     className="image-right"
                  />
               </div>
            </div>
            <div className="container">
               <div className="frame-left">
                  <img
                     src="/img4.jpg"
                     alt="Personagens"
                     className="image-left"
                  />
               </div>
               <div className="text-right">
                  <h2>Torne o seu mundo vivo</h2>
                  <p>
                     Rainhas, reis, cavaleiros, mercadores, aventureiros,
                     contrabandista e muito mais! Crie seus personagens mais
                     importantes e impressione seus jogadores!
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
