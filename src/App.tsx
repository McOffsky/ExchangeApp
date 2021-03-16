import React, { Component, RefObject } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";

import IAppState from "./Interface/State/IAppState";
import IAppProps from "./Interface/Props/IAppProps";
import IExchangeValue from "./Interface/IExchangeValue";
import ExchangeInput from "./Component/ExchangeInput";
import ExchangeHistory from "./Component/ExchangeHistory";
import ErrorContainer from "./Component/ErrorContainer";

const webserviceBaseURL = process.env.REACT_APP_EXCHANGE_WEBSERVICE_URL;
const userInputDeplay = 500;

export default class App extends Component<IAppProps, IAppState> {
  private timeout?: NodeJS.Timeout;

  protected sourceInput: RefObject<ExchangeInput>;
  protected targetInput: RefObject<ExchangeInput>;

  public constructor(props: IAppProps) {
    super(props);

    this.sourceInput = React.createRef();
    this.targetInput = React.createRef();

    this.timeout = undefined;
    this.state = {
      supportedCurrencies: [],
      exchangeHistory: [],
      error: undefined,
    };
  }

  public componentDidMount(): void {
    axios
      .get(webserviceBaseURL + `/currencies`)
      .then((response: AxiosResponse<string[]>) => {
        this.setState({
          error: undefined,
          supportedCurrencies: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: error.response });
      });
  }

  private exchange(
    sourceInput: RefObject<ExchangeInput>,
    targetInput: RefObject<ExchangeInput>,
    reverseHistoryLog = false
  ): void {
    if (typeof this.timeout !== "undefined") {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      if (
        typeof sourceInput.current?.state.amount === "undefined" ||
        isNaN(sourceInput.current?.state.amount)
      ) {
        return;
      }

      axios
        .get(webserviceBaseURL + `/exchange`, {
          params: {
            amount: sourceInput.current?.state.amount,
            sourceCurrency: sourceInput.current?.state.currency,
            targetCurrency: targetInput.current?.state.currency,
          },
        })
        .then((response: AxiosResponse<IExchangeValue>) => {
          sourceInput.current?.setValue(response.data.source);
          targetInput.current?.setValue(response.data.target);

          this.setState((prevState) => ({
            error: undefined,
            exchangeHistory: [
              {
                source: response.data.source,
                target: response.data.target,
                reversed: reverseHistoryLog,
              },
              ...prevState.exchangeHistory.slice(0, 9),
            ],
          }));
        })
        .catch((error) => {
          this.setState({ error: error.response });
        });
    }, userInputDeplay);
  }

  private onSourceInputUpdate(): void {
    this.exchange(this.sourceInput, this.targetInput);
  }

  private onTargetInputUpdate(): void {
    this.exchange(this.targetInput, this.sourceInput, true);
  }

  public render() {
    return (
      <div className="App">
        <div>
          <ExchangeInput
            className="sourceInput"
            ref={this.sourceInput}
            onAmountChange={this.onSourceInputUpdate.bind(this)}
            onCurrencyChange={this.onSourceInputUpdate.bind(this)}
            supportedCurrencies={this.state.supportedCurrencies}
            placeholder="from"
          />

          <span className="separator"> = </span>

          <ExchangeInput
            className="targetInput"
            ref={this.targetInput}
            onAmountChange={this.onTargetInputUpdate.bind(this)}
            onCurrencyChange={this.onSourceInputUpdate.bind(this)} // if currency changed in target input controller, recalcuate target
            supportedCurrencies={this.state.supportedCurrencies}
            placeholder="to"
          />
        </div>
        <ErrorContainer error={this.state.error} />
        <div>
          <ExchangeHistory history={this.state.exchangeHistory} />
        </div>
      </div>
    );
  }
}
