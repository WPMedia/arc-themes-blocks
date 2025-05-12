import Overline from ".";

export default {
	title: "Components/Overline",
	component: Overline,
};

export const DefaultOverline = {
	render: () => <Overline>Overline Text</Overline>,
	name: "Overline",
};

export const OverlineHyperlink = {
	render: () => <Overline href="./">Overline Text as a Hyperlink</Overline>,
};
