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
	GBP: "£",
	AUD: "A$",
	ARS: "ARS$",
	ZAR: "R"
};

const currency = (name) => CURRECY_MAP[name] || null;

export default currency;