type Props = {
  placeholder: string;
  id: string;
  maxLength: string;
  minLength: string;
  type: string;
};

export function Text(props: Props) {
  return (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      maxLength={Number(props.maxLength)}
      minLength={Number(props.minLength)}
      className="inputText"
    />
  );
}
