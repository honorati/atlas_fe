const Loading = () => {
   return (
      <div className="overlay">
         <img
            className="loading-image"
            src="/loading.png"
            alt="Loading"
            draggable="false"
         />
         <div className="loading"></div>
      </div>
   );
};

export { Loading };
