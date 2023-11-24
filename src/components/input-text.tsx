import React, { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  id: string;
  maxLength: number;
  minLength: number;
  type: string;
  initialValue?: string;
};

export class Text extends React.Component<Props, { value: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { value: this.props.initialValue || "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <input
        id={this.props.id}
        type={this.props.type}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
        minLength={this.props.minLength}
        className="inputText"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
