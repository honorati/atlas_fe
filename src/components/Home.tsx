import React from "react";

const Home: React.FC = () => {
   return (
      <>
         <div className="container-centralized">
            <img
               src="/logo.png"
               alt="Atlas do Multiverso"
               className="logo"
               draggable="false"
            />
            <hr className="gradient-line" />
            <h2>O gerenciador definitivo para sua campanha de RPG</h2>
            <p>Disponível em 20/12/2023</p>
            <hr className="gradient-line" />
            <div className="container">
               <div className="text-left">
                  <h3>Crie seus mundos</h3>
                  <p className="text-justify">
                     O Atlas do Multiverso é uma plataforma online para
                     gerenciamento de campanhas de RPG. Crie e gerencie mundos,
                     reinos, cidades, dungeons e muito mais!
                  </p>
               </div>
               <div className="frame-right">
                  <img
                     src="/img1.jpg"
                     alt="Mundos"
                     className="image-right"
                     draggable="false"
                  />
               </div>
            </div>
            <div className="container">
               <div className="frame-left">
                  <img
                     src="/img2.jpg"
                     alt="Aventuras"
                     className="image-left"
                     draggable="false"
                  />
               </div>
               <div className="text-right">
                  <h3>Organize suas aventuras</h3>
                  <p className="text-justify">
                     Crie e gerencie suas aventuras de RPG de forma rápida e
                     fácil. Adicione personagens, locais, itens e muito mais!
                  </p>
                  <p style={{color: 'red'}}>Em breve!</p>
               </div>
            </div>
            <div className="container">
               <div className="text-left">
                  <h3>Crie seus inimigos e oponentes!</h3>
                  <p className="text-justify">
                     Inimigos poderosos, hordas gisgantescas, sangue e
                     destruição para todos os lados! Crie seus monstros e
                     compartilhe com a comunidade!
                  </p>
                  <p style={{color: 'red'}}>Em breve!</p>
               </div>
               <div className="frame-right">
                  <img
                     src="/img3.jpg"
                     alt="Bestiario"
                     className="image-right"
                     draggable="false"
                  />
               </div>
            </div>
            <div className="container">
               <div className="frame-left">
                  <img
                     src="/img4.jpg"
                     alt="Personagens"
                     className="image-left"
                     draggable="false"
                  />
               </div>
               <div className="text-right">
                  <h3>Torne o seu mundo vivo</h3>
                  <p className="text-justify">
                     Rainhas, reis, cavaleiros, mercadores, aventureiros,
                     contrabandista e muito mais! Crie seus personagens mais
                     importantes e impressione seus jogadores!
                  </p>
                  <p style={{color: 'red'}}>Em breve!</p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
