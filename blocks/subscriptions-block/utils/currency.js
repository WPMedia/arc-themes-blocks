const CURRECY_MAP = {
  USD: '$',
  NZD: '$',
  EUR: '€',
  PEN: 'S/.',
  JPY: '¥',
  CLP: '$',
  COP: '$',
  KRW: '₩',
  MXN: '$',
  BRL: 'R$',
};

const currency = (
  name,
) => CURRECY_MAP[name] || null;

export default currency;
