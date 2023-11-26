import { useState, ChangeEvent, forwardRef, ForwardedRef } from "react";

type Props = {
  placeholder: string;
  id: string;
  maxLength: number;
  minLength: number;
  type: string;
  initialValue?: string;
};

const Text = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const [value, setValue] = useState<string>(props.initialValue || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      ref={ref}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      minLength={props.minLength}
      className="inputText"
      value={value}
      onChange={handleChange}
    />
  );
});

export { Text };
