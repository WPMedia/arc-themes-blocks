const CURRENCY_MAP = {
	USD: "$",
	NZD: "$",
	EUR: "€",
	PEN: "S/.",
	JPY: "¥",
	CLP: "$",
	COP: "$",
	KRW: "₩",
	MXN: "$",
	BRL: "R$",
	CAD: "CA$",
	GBP: "£",
	AUD: "A$",
	ARS: "$",
	ZAR: "R",
};

const currency = (name) => CURRENCY_MAP[name] || null;

export default currency;
