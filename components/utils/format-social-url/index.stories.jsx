import formatSocialURL from ".";

export default {
	title: "Utilities/Format Social URL",
	component: formatSocialURL,
};

export const Email = {
	render: () => formatSocialURL("email", "email@domain.tld"),
};

export const Facebook = {
	render: () => formatSocialURL("facebook", "mySocialId"),
};

export const Instagram = {
	render: () => formatSocialURL("instagram", "mySocialId"),
};

export const LinkedIn = {
	render: () => formatSocialURL("linkedin", "mySocialId"),
	name: "LinkedIn",
};

export const Medium = {
	render: () => formatSocialURL("medium", "mySocialId"),
};

export const Pinterest = {
	render: () => formatSocialURL("pinterest", "mySocialId"),
};

export const Reddit = {
	render: () => formatSocialURL("reddit", "mySocialId"),
};

export const Snapchat = {
	render: () => formatSocialURL("snapchat", "mySocialId"),
};

export const SoundCloud = {
	render: () => formatSocialURL("soundcloud", "mySocialId"),
	name: "SoundCloud",
};

export const Tumblr = {
	render: () => formatSocialURL("tumblr", "mySocialId"),
};

export const Twitter = {
	render: () => formatSocialURL("twitter", "mySocialId"),
};

export const WhatsApp = {
	render: () => formatSocialURL("whatsapp", "mySocialId"),
	name: "WhatsApp",
};

export const Youtube = {
	render: () => formatSocialURL("youtube", "mySocialId"),
};
