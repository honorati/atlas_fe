import { PinMap } from "./pin-map";
import "../styles/Maps.css";

export function MapEditor() {
  function pegarCoordenada() {
    const image = document.getElementById("imageMap");
    const e = event as MouseEvent;
    if (image) {
      const circle = image.getBoundingClientRect();
      const x = e.clientX - circle.left;
      const y = e.clientY - circle.top;
      alert(
        "Você clicou na posição ( " +
          (y - 50) +
          "px 0px 0px " +
          (x - 25) +
          "px ) da imagem",
      );
    }
  }
  return (
    <div>
      <img
        className="worldMap"
        id="imageMap"
        src="/Twornaia Small.jpg"
        onClick={() => pegarCoordenada()}
      />
      <PinMap
        id={"1"}
        position={"823.1750183105469px 0px 0px 596px"}
        description={"Arcos"}
        type={"city"}
      />
    </div>
  );
}
