import formatPowaVideoEmbed from ".";

export default {
	title: "Utilities/Format Powa Video Embed",
	component: formatPowaVideoEmbed,
};

export const WithAutoplayAndMutedFieldsSet = {
	render: () =>
		formatPowaVideoEmbed(
			'<div class="powa" id="powa-e9zzz"><script src="//fff.cloudfront.net/prod/powaBoot.js?org=your-org"></script></div>',
			{
				muted: true,
				autoplay: true,
			},
		),

	name: "With autoplay and muted fields set",
};

export const WithNoFieldsSet = {
	render: () =>
		formatPowaVideoEmbed(
			'<div class="powa" id="powa-e9zzz"><script src="//fff.cloudfront.net/prod/powaBoot.js?org=your-org"></script></div>',
		),

	name: "With no fields set",
};
