import Icon from "../icon";

import Details from ".";

export default {
	title: "Components/Details",
	component: Details,
};

export const DefaultDetails = {
	render: () => <Details summary="Summary">Details Text</Details>,
	name: "Details",
};

export const DetailsOpen = {
	render: () => (
		<Details summary="Summary" open>
			Details Text
		</Details>
	),
};

export const DetailsWithHtmlContext = {
	render: () => (
		<Details summary="Summary" open childrenHTML>
			{"Details Text <br />Details Text"}
		</Details>
	),

	name: "Details with HTML Context",
};

export const DetailsWithIcon = {
	render: () => (
		<Details summary="Summary" icon={<Icon name="ChevronDown" />}>
			Details Text
		</Details>
	),
	name: "Details with icon",
};

export const DetailsWithLeftIcon = {
	render: () => (
		<Details summary="Summary" icon={<Icon name="ChevronDown" />} iconPlacement="left">
			Details Text
		</Details>
	),
	name: "Details with Left icon",
};
