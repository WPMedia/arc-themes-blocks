import Separator from ".";

export default {
	title: "Components/Separator",
	component: Separator,
};

export const CustomString = {
	render: () => (
		<p>
			<Separator separatorString="||" />
			this
			<Separator separatorString="||" />
			or <Separator separatorString="||" />
			that
			<Separator separatorString="||" />
		</p>
	),

	name: "Custom string",
};

export const CustomStringWithEmoji = {
	render: () => (
		<p>
			<Separator separatorString="🚨" />
			alert
			<Separator separatorString="🚨" />
			alert
			<Separator separatorString="🚨" />
			alert
			<Separator separatorString="🚨" />
		</p>
	),

	name: "Custom string with emoji",
};

export const Default = {
	render: () => (
		<p>
			My name
			<Separator />
			Your name here
		</p>
	),
};
