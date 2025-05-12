import Icon from "../icon";
import Stack from "../stack";
import Button from ".";

export default {
	title: "Components/Button",
	component: Button,
};

export const ButtonSizes = {
	render: () => (
		<Stack gap="10px" direction="horizontal">
			<Button size="small">Small</Button>
			<Button size="medium">Medium</Button>
			<Button size="large">Large</Button>
		</Stack>
	),
};

export const ButtonVariants = {
	render: () => (
		<Stack gap="10px" direction="horizontal">
			<Button>Default</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="primary-reverse">Primary reverse</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="secondary-reverse">Secondary reverse</Button>
		</Stack>
	),
};

export const ButtonWithHtmlContent = {
	render: () => (
		<Button>
			<em>Button Text</em>
		</Button>
	),

	name: "Button with HTML content",
};

export const ButtonWithOnClickEvent = {
	render: () => (
		// eslint-disable-next-line no-alert
		<Button onClick={() => alert("here")}>Click Me</Button>
	),

	name: "Button with onClickEvent",
};

export const DefaultButton = {
	render: () => <Button className="additional-class">Button Text</Button>,

	name: "Button",
};

export const DisabledButton = {
	render: () => (
		// eslint-disable-next-line no-alert
		<Button disabled onClick={() => alert("disabled?")}>
			Button Text
		</Button>
	),
};

export const FullWidth = {
	render: () => <Button fullWidth>Button Text</Button>,
};

export const IconOnly = {
	render: () => (
		<Button accessibilityLabel="My Account">
			<Icon name="User" width="24" height="24" />
		</Button>
	),
};

export const LeftIconOnly = {
	render: () => (
		<Button
			accessibilityLabel="My Account"
			iconLeft={<Icon name="User" width="24" height="24" />}
		/>
	),
};

export const LinkButton = {
	render: () => <Button href="/">Link Button</Button>,
};

export const MultipleButtons = {
	render: () => (
		<>
			<Button>Save</Button>
			<Button type="reset">Reset</Button>
		</>
	),
};

export const WithIcons = {
	render: () => (
		<Button
			iconLeft={<Icon name="User" width="24" height="24" />}
			iconRight={<Icon name="ChevronDown" width="24" height="24" />}
		>
			My Account
		</Button>
	),
};
