import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import FullAuthorBioPresentational from "./features/full-author-bio/_children/Presentation";

export default {
	title: "Blocks/Full Author Bio",
	decorators: [withKnobs],
	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

// full author bio only supports one author
// it takes in an array of potential authors
const authorObject = {
	_id: "janedoe",
	firstName: "Jane",
	lastName: "Doe",
	byline: "Jane Da Doe",
	role: "Senior Product Manager",
	url: "#",
	image:
		"https://s3.amazonaws.com/arc-authors/corecomponents/0a2eb086-d143-48a1-b306-69dba75cb5b8.png",
	email: "jane@doe.com",
	facebook: "https://facebook.com/janedoe",
	twitter: "janedoe",
	longBio:
		"Jane Doe is a senior product manager for Arc Publishing. This is a Long bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	instagram: "janedoe",
	rss: "someusername",
	linkedin: "someusername",
	reddit: "someusername",
	youtube: "someusername",
	medium: "someusername",
	tumblr: "someusername",
	pinterest: "someusername",
	snapchat: "someusername",
	whatsapp: "someusername",
	soundcloud: "someusername",
};

export const allFieldsFull = () => (
	<FullAuthorBioPresentational author={authorObject} locale="en" />
);

export const noSocialAccounts = () => {
	const {
		email,
		facebook,
		twitter,
		instagram,
		rss,
		linkedin,
		reddit,
		youtube,
		medium,
		tumblr,
		pinterest,
		snapchat,
		whatsapp,
		soundcloud,
		...authorNoSocialKeys
	} = authorObject;

	return <FullAuthorBioPresentational author={authorNoSocialKeys} locale="en" />;
};

export const noRole = () => {
	const authorNoRole = {
		...authorObject,
		role: "",
	};

	return <FullAuthorBioPresentational author={authorNoRole} locale="en" />;
};

export const noByline = () => {
	const authorNoByline = {
		...authorObject,
		byline: "",
	};

	return <FullAuthorBioPresentational author={authorNoByline} locale="en" />;
};

export const noBioNorLongBio = () => {
	const authorNoBio = {
		...authorObject,
		bio: "",
		longBio: "",
	};

	return <FullAuthorBioPresentational author={authorNoBio} locale="en" />;
};

export const noImage = () => {
	const authorNoImage = {
		...authorObject,
		image: "",
		resized_params: {},
	};

	return <FullAuthorBioPresentational author={authorNoImage} locale="en" />;
};

export const linkedAuthorName = () => (
	<FullAuthorBioPresentational author={authorObject} linkAuthorProfile locale="en" />
);
