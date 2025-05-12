import * as Icons from "./icons";
import Stack from "../stack";

import Icon from ".";

export default {
	title: "Components/Icon",
	component: Icon,
};

export const AllIcons = {
	render: () => (
		<Stack direction="horizontal" wrap="wrap">
			{Object.keys(Icons).map((key) => (
				<Icon name={key} />
			))}
		</Stack>
	),
};

export const SingleIcon = {
	render: () => <Icon name="User" />,
};

export const SingleIconWithFill = {
	render: () => <Icon name="User" fill="#bfacc2" />,
	name: "Single Icon with fill",
};
