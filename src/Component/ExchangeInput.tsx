import React, { Component, RefObject } from "react";
import IExchangeInputState from "../Interface/State/IExchangeInputState";
import IExchangeInputProps from "../Interface/Props/IExchangeInputProps";
import ICurrencyValue from "../Interface/ICurrencyValue";

export default class ExchangeInput extends Component<
  IExchangeInputProps,
  IExchangeInputState
> {
  public props: IExchangeInputProps;
  protected amountInput: RefObject<HTMLInputElement>;
  protected currencySelector: RefObject<HTMLSelectElement>;

  public constructor(props: IExchangeInputProps) {
    super(props);
    this.props = props;

    this.amountInput = React.createRef();
    this.currencySelector = React.createRef();

    this.state = {
      amount: undefined,
      currency: undefined,
    };
  }

  public componentDidUpdate(): void {
    if (typeof this.state.currency === "undefined") {
      this.setState({ currency: this.props.supportedCurrencies[0] });
    }
  }

  public setValue(value?: ICurrencyValue) {
    this.setState({
      amount: value?.amount,
      currency: value?.currency,
    });
  }

  public handleChange(handler: any): void {
    const val = this.amountInput.current?.value;

    if (typeof val === "undefined" || val.length === 0) {
      this.setState({
        amount: undefined,
        currency: this.currencySelector.current?.value,
      });

      return;
    }

    this.setState(
      {
        amount: Number(val.replace(",", ".")),
        currency: this.currencySelector.current?.value,
      },
      handler(this.state)
    );
  }

  public handleAmountChange(): void {
    this.handleChange(this.props.onAmountChange);
  }

  public handleCurrencyChange(): void {
    this.handleChange(this.props.onCurrencyChange);
  }

  public render() {
    return (
      <span className={this.props.className}>
        <input
          ref={this.amountInput}
          type="text"
          value={this.state.amount || ""}
          onChange={this.handleAmountChange.bind(this)}
          placeholder={this.props.placeholder}
        />
        <select
          ref={this.currencySelector}
          value={this.state.currency}
          onChange={this.handleCurrencyChange.bind(this)}
        >
          {this.props.supportedCurrencies.map((currency, i: number) => (
            <option key={i} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </span>
    );
  }
}
