import ICurrencyValue from "./ICurrencyValue";

export default interface IExchangeValue {
  source?: ICurrencyValue;
  target?: ICurrencyValue;
}
