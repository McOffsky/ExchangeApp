import React, { Component } from "react";
import IExchangeHistoryProps from "../Interface/Props/IExchangeHistoryProps";
import IExchangeHistoryValue from "../Interface/IExchangeHistoryValue";

export default class ExchangeHistory extends Component<IExchangeHistoryProps> {
  public props: IExchangeHistoryProps;

  public constructor(props: IExchangeHistoryProps) {
    super(props);
    this.props = props;
  }

  public render() {
    return (
      <ul>
        {this.props.history.map(
          ({ source, target, reversed }: IExchangeHistoryValue, i: number) => (
            <li key={i}>
              <span>
                {(reversed ? target : source)?.amount}{" "}
                {(reversed ? target : source)?.currency}
              </span>
              <span className="separator"> = </span>
              <span>
                {(reversed ? source : target)?.amount}{" "}
                {(reversed ? source : target)?.currency}
              </span>
            </li>
          )
        )}
      </ul>
    );
  }
}
