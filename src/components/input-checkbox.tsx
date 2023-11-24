import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  id: string;
  initialValue?: string;
};

type State = {
  value: string;
};

export class CheckBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: this.props.initialValue || "" };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="containerLabel">
        <div className="checkbox-wrapper-44">
          <label className="toggleButton">
            <input
              type="checkbox"
              id={this.props.id}
              defaultChecked
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div>
              <svg viewBox="0 0 44 44">
                <path
                  d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                  transform="translate(-2.000000, -2.000000)"
                ></path>
              </svg>
            </div>
          </label>
        </div>
        <label htmlFor="">{this.props.label}</label>
      </div>
    );
  }
}
