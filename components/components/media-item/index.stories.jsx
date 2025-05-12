import MediaItem from ".";
import Image from "../image";
import Video from "../video";

export default {
	title: "Components/Media Item",
	component: MediaItem,
};

export const Default = {
	render: () => (
		<MediaItem
			credit="John Doe (Stock Photo)"
			title="Person Sitting"
			caption="There is a person using a laptop"
		>
			<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
		</MediaItem>
	),
};

export const NoCaption = {
	render: () => <MediaItem caption="" credit="John Doe (Stock Photo)" title="Man Bites Dog" />,
	name: "No caption",
};

export const NoCredit = {
	render: () => (
		<MediaItem
			caption="There is a man on the loose who seems to be biting dogs"
			credit=""
			title="Man Bites Dog"
		/>
	),

	name: "No credit",
};

export const NoTitle = {
	render: () => (
		<MediaItem
			caption="There is a man on the loose who seems to be biting dogs"
			credit="John Doe (Stock Photo)"
			title=""
		/>
	),

	name: "No title",
};

export const NoTitleCaptionNorCredit = {
	render: () => <MediaItem caption="" credit="" title="" />,
	name: "No title, caption, nor credit",
};

export const RendersHtmlPassedIntoTitleOrCaption = {
	render: () => (
		<MediaItem
			title="<p>Important Alert</p>"
			caption="<div><p>There is man on the loose biting dogs</p></div><div><p>All dogs should evacuate the area</p></div>"
			credit="<div><p>John Doe (<i>Stock Photo</i>)</p></div>"
		/>
	),

	name: "Renders html passed into title or caption",
};

export const WithImage = {
	render: () => (
		<MediaItem credit="John Doe (Stock Photo)" title="Person Sitting">
			<Video
				borderRadius
				aspectRatio="9:16"
				embedMarkup={
					'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
				}
			/>
		</MediaItem>
	),

	name: "With image",
};
