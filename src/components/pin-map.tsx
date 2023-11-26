import "../styles/Maps.css";

type Props = {
  id: string;
  position: string;
  description: string;
  type: string;
};

export function PinMap(props: Props) {
  let pinImage = "/pinCity.png";

  if (props.type === "poi") {
    pinImage = "/pinPOI.png";
  } else if (props.type === "dungeon") {
    pinImage = "/pinDungeon.png";
  }
  return (
    <img
      id={props.id}
      src={pinImage}
      className="pinMapImage"
      style={{ margin: props.position }}
      alt={props.description}
      title={props.description}
    />
  );
}
