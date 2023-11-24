const CURRECY_MAP = {
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
	GBP: "£"
};

const currency = (name) => CURRECY_MAP[name] || null;

export default currency;