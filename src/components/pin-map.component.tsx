type Props = {
  id: string;
  position: string;
  description: string;
  type: string;
};

export function PinMap(props: Props) {
  return (
      <img
        id={props.id}
        src="/poi.png"
        className="pinMapImage"
        style={{ margin: props.position }}
        alt={props.description}
        title={props.description}
      />
  );
}
