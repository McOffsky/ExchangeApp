import IExchangeHistoryValue from "../IExchangeHistoryValue";

export default interface IAppState {
  supportedCurrencies: string[];
  exchangeHistory: IExchangeHistoryValue[];
  error: any;
}
