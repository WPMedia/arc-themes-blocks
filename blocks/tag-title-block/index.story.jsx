import React from "react";
import { TagTitleOutput as TagTitle } from "./features/tag-title/default";

export default {
	title: "Blocks/Tag Title",
};

const fullMockData = {
	Payload: [
		{
			description: "This is a tag about dogs. This is the description field.",
			name: "Dogs",
		},
	],
};

const noDescriptionMock = {
	Payload: [
		{
			name: "Dogs",
		},
	],
};

const noTitleMock = {
	Payload: [
		{
			description: "This is a tag about dogs. This is the description field.",
		},
	],
};

export const withNameAndDescription = () => <TagTitle data={fullMockData} />;

export const noTitle = () => <TagTitle data={noTitleMock} />;

export const noDescription = () => <TagTitle data={noDescriptionMock} />;
