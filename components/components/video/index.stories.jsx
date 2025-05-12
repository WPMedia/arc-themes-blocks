import Video from ".";

export default {
	title: "Components/Video",
	component: Video,
};

export const TwoVideosDifferentAspectRatios = {
	render: () => (
		<Video
			aspectRatio="4:3"
			embedMarkup={
				'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.75" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
			}
		/>
	),

	name: "Two videos, different aspect ratios",
};

export const VerticalVideoWithRoundedCornersWithCustomViewportPercentage = {
	render: () => (
		<Video
			viewportPercentage={80}
			aspectRatio="9:16"
			borderRadius
			embedMarkup={
				'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
			}
		/>
	),

	name: "Vertical video with rounded corners with custom viewport percentage",
};

export const VideoFullVerticalViewportLoading = {
	render: () => (
		<Video
			viewportPercentage={100}
			aspectRatio="9:16"
			embedMarkup={
				'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
			}
		/>
	),
};

export const VideoHalfVerticalViewportLoading = {
	render: () => (
		<Video
			viewportPercentage={50}
			aspectRatio="9:16"
			embedMarkup={
				'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
			}
		/>
	),
};

export const VideoOneThirdVerticalViewportLoading = {
	render: () => (
		<Video
			viewportPercentage={33.33}
			aspectRatio="9:16"
			embedMarkup={
				'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>'
			}
		/>
	),
};
