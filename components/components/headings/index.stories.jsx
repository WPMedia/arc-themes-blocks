import Heading from "./heading";

export default {
	title: "Components/Heading",
	component: Heading,
};

export const DefaultHeading = {
	render: () => <Heading>Heading Level 1</Heading>,
	name: "Heading",
};

export const HeadingWithCustomAdditionalClasses = {
	render: () => <Heading additionalClassNames="test-class test-class-1">Heading Level 1</Heading>,
};

export const HeadingWithTruncation = {
	render: () => (
		<div
			style={{
				width: "200px",
			}}
		>
			<Heading truncationLines={2}>
				Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
				industries for previewing layouts and visual mockups.
			</Heading>
		</div>
	),

	name: "Heading with truncation",
};

export const NestedHeadings = {
	render: () => <Heading>Heading Level 1</Heading>,
};
