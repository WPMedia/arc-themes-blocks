import Link from ".";

export default {
	title: "Components/Link",
	component: Link,
};

export const CustomAccessibleText = {
	render: () => (
		<Link
			href="https://www.arcxp.com/"
			openNewTabLinkVisuallyHiddenText="Go to that page"
			supplementalText="This link will give you new insight into the Arc XP company"
		>
			Arc XP
		</Link>
	),

	name: "Custom accessible text",
};

export const ExternalLinkDueToLinkContents = {
	render: () => <Link href="https://www.arcxp.com/">External Link to Arc XP</Link>,
};

export const ExternalLinkDueToOptingIntoNewTab = {
	render: () => (
		<Link href="/" openInNewTab>
			Open &quot;/&quot; in a new tab
		</Link>
	),
};

export const InternalLinkDueToLinkContents = {
	render: () => <Link href="/">Internal Link to Home</Link>,
};

export const InternalLinkDueToOptingIntoSameTab = {
	render: () => (
		<Link href="https://www.arcxp.com/" openInNewTab={false}>
			Go to Arc XP without going to a new tab
		</Link>
	),
};
