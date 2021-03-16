import ICurrencyValue from "./ICurrencyValue";

export default interface IExchangeHistoryValue {
  source?: ICurrencyValue;
  target?: ICurrencyValue;
  reversed: boolean;
}
