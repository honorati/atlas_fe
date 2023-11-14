type Props = {
  placeholder: string;
  id: string;
  maxLength: number;
  minLength: number;
};

export function CheckBox(props: Props) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="inputText"
      id={props.id}
      maxLength={props.maxLength}
      minLength={props.minLength}
    />
  );
}
