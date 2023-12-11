const Beware = () => {
   localStorage.clear();
   sessionStorage.clear();
   return (
      <div className="container-centralized ">
         <h1>CUIDADO!</h1>
         <img src="/iGotYou.png" alt="Beware" draggable="false" />
         <h2>NÃO TENTE ENGANAR GOBLINS MAL PAGOS E FAMINTOS!</h2>
         <p>Atitudes assim podem causar seu banimento!</p>
         <a href="/home" style={{ color: "white" }}>
            Voltar ao site
         </a>
      </div>
   );
};

export { Beware };
