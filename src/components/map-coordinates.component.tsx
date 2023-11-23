import { PinMap } from "./pin-map.component";

export function MapEditor() {
  function pegarCoordenada() {
    const image = document.getElementById("imageMap");
    const e = event as MouseEvent
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
          type={""}
        />
        <PinMap
          id={"2"}
          position={"749.1750183105469px 0px 0px 1152px"}
          description={"Eldonado"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"496.7749938964844px 0px 0px 1403px"}
          description={"Evinter"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"245px 0px 0px 557px"}
          description={"Dellendil"}
          type={""}
        />        
        <PinMap
          id={"2"}
          position={"979px 0px 0px 406px"}
          description={"Valle"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"584px 0px 0px 307px"}
          description={"Tol'Badur"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"635px 0px 0px 661.953125px"}
          description={"Felta"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={" 549px 0px 0px 596.953125px"}
          description={"Porto do Aço"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"740px 0px 0px 734.953125px"}
          description={"Maherine"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"910px 0px 0px 613.953125px"}
          description={"Lindesbaerg"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"517px 0px 0px 852.953125px"}
          description={"Lhamaratuss"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"1208px 0px 0px 552.6875px"}
          description={"Dvar"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"1220px 0px 0px 287.6875px"}
          description={"Tchibum"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"1071px 0px 0px 634.6875px"}
          description={"Nova Baerglum"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"1047px 0px 0px 856.6875px"}
          description={"Bomboda"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"1041px 0px 0px 961.6875px"}
          description={"Rocha"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"752px 0px 0px 1038.6875px"}
          description={"Pembroke"}
          type={""}
        />
        <PinMap
          id={"2"}
          position={"898px 0px 0px 1101.6875px"}
          description={"Porto Miriel"}
          type={""}
        />
    </div>
  );
}

// 514,40
// 460,40
// 54 de diferença

// 513,49
// 490,49

// 23 de diferença
