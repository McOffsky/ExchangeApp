import React, { Component } from "react";
import IErrorContainerProps from "../Interface/Props/IErrorContainerProps";

export default class ErrorContainer extends Component<IErrorContainerProps> {
  public props: IErrorContainerProps;

  public constructor(props: IErrorContainerProps) {
    super(props);
    this.props = props;
  }

  public render() {
    let errorText: any = undefined;

    if (typeof this.props.error !== "undefined") {
      const messages: string[] = [];

      if (Array.isArray(this.props.error.data.message)) {
        messages.push(...this.props.error.data.message);
      } else {
        messages.push(this.props.error.data.message);
      }

      errorText = (
        <div>
          {messages.map((msg: string, i: number) => (
            <span key={i}>{msg}</span>
          ))}
        </div>
      );
    }

    return <div className="errorWrapper">{errorText}</div>;
  }
}
