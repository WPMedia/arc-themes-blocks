import mockData from "./mock-data";

export default {
	...mockData,
	owner: {
		sponsored: true,
		id: "corecomponents",
	},
	label: { basic: { url: "/sponsor", text: "Sponsored", display: true } },
};
