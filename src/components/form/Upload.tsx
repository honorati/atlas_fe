import "../../style/Upload.css";

const Upload = () => {
   return (
      <div>
         <input type="file" id="file" className="input-file" accept="image" />
      </div>
   );
};

export { Upload };
