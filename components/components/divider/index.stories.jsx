import Divider from ".";

export default {
	title: "Components/Divider",
	component: Divider,
};

export const DefaultDivider = {
	render: () => (
		<article>
			<p>A paragraph of text</p>
			<Divider />
			<p>A second paragraph of text that is a thematic change from the first</p>
		</article>
	),

	name: "Divider",
};

export const DividerAssistiveHidden = {
	render: () => (
		<div>
			<p>A paragraph of text</p>
			<Divider assistiveHidden />
			<p>Another paragraph of text that you want to divide visually</p>
		</div>
	),

	name: "Divider assistive hidden",
};
