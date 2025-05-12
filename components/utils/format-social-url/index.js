const SocialTypes = Object.freeze({
	Email: "email",
	Facebook: "facebook",
	Instagram: "instagram",
	LinkedIn: "linkedin",
	Medium: "medium",
	Pinterest: "pinterest",
	Reddit: "reddit",
	Rss: "rss",
	Snapchat: "snapchat",
	SoundCloud: "soundcloud",
	Tumblr: "tumblr",
	Twitter: "twitter",
	WhatsApp: "whatsapp",
	Youtube: "youtube",
});

function formatSocialURL(type, field) {
	// return field if it comes in with a protocol prefix
	if (field.match(/^https?:\/\/\S+/)) {
		return field;
	}
	switch (type) {
		case SocialTypes.Email:
			return `mailto:${field}`;
		case SocialTypes.Facebook:
			return `https://www.facebook.com/${field}`;
		case SocialTypes.Instagram:
			return `https://www.instagram.com/${field}/`;
		case SocialTypes.LinkedIn:
			return `https://www.linkedin.com/in/${field}/`;
		case SocialTypes.Medium:
			return `https://medium.com/${field}`;
		case SocialTypes.Pinterest:
			return `https://www.pinterest.com/${field}/`;
		case SocialTypes.Reddit:
			return `https://www.reddit.com/user/${field}/`;
		case SocialTypes.Snapchat:
			return `https://www.snapchat.com/add/${field}`;
		case SocialTypes.SoundCloud:
			return `https://soundcloud.com/${field}`;
		case SocialTypes.Tumblr:
			return `https://${field}.tumblr.com`;
		case SocialTypes.Twitter:
			return `https://twitter.com/${field}`;
		case SocialTypes.WhatsApp:
			return `https://wa.me/${field}`;
		case SocialTypes.Youtube:
			return `https://www.youtube.com/user/${field}`;
		default:
			return field;
	}
}

formatSocialURL.types = SocialTypes;

export default formatSocialURL;
