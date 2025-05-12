import Icon from "../icon";
import Image from "../image";
import Button from "./_children/Button";
import Item from "./_children/Item";
import Carousel from ".";

export default {
	title: "Components/Carousel",
	component: Carousel,
	subcomponents: { Button, Item },
};

export const AdPlacement = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			adInterstitialClicks={2}
			adElement={
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Ad Placement
				</div>
			}
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const DefaultCarousel = {
	render: () => (
		<div>
			<Carousel
				id="carousel-1"
				label="Carousel of Images"
				nextButton={
					<Carousel.Button id="carousel-1" label="Next Slide">
						<Icon name="ArrowRight" />
					</Carousel.Button>
				}
				previousButton={
					<Carousel.Button id="carousel-1" label="Previous Slide">
						<Icon name="ArrowLeft" />
					</Carousel.Button>
				}
			>
				<Carousel.Item label="Slide 1 of 6">
					{({ viewable }) => (
						<a href="/" aria-hidden={viewable ? null : true} tabIndex={viewable ? null : "-1"}>
							<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
						</a>
					)}
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 6">
					<a href="/">
						<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 6">
					<a href="/">
						<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 6">
					<a href="/">
						<Image src="/coffee.jpeg" alt="A cup of coffee" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 6">
					{({ viewable }) => (
						<div>
							<a href="/" aria-hidden={viewable ? null : true} tabIndex={viewable ? null : "-1"}>
								<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
							</a>
						</div>
					)}
				</Carousel.Item>
				<Carousel.Item label="Slide 6 of 6">
					<a href="/">
						<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
					</a>
				</Carousel.Item>
			</Carousel>
		</div>
	),

	name: "Carousel",
};

export const DisplayAutoplayToggle = {
	render: () => (
		<Carousel id="carousel-1" label="Carousel of Images" slidesToShow={1} enableAutoplay>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Display autoplay toggle",
};

export const DisplayAutoplayToggleWithMultipleSlidesShowingAndFullScreenToggleShowing = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={2}
			enableAutoplay
			enableFullScreen
			startAutoplayIcon={<Icon name="Play" />}
			startAutoplayText="Start Autoplay"
			stopAutoplayIcon={<Icon name="Pause" />}
			stopAutoplayText="Stop Autoplay"
		>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Display autoplay toggle with multiple slides showing and full-screen toggle showing",
};

export const DisplayAutoplayToggleWithMultipleSlidesShowingFullScreenToggleShowingShowLabel = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={2}
			enableAutoplay
			enableFullScreen
			showLabel
			startAutoplayIcon={<Icon name="Play" />}
			startAutoplayText="Start Autoplay"
			stopAutoplayIcon={<Icon name="Pause" />}
			stopAutoplayText="Stop Autoplay"
		>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Display autoplay toggle with multiple slides showing, full-screen toggle showing, show label",
};

export const DisplayCustomAutoplayToggle = {
	render: () => (
		<Carousel
			autoplayPhraseLabels={{
				start: "Start that autoplay thing",
				stop: "Stop that autoplay thing",
			}}
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			enableAutoplay
			startAutoplayIcon={<Icon name="Play" />}
			startAutoplayText="Start Autoplay"
			stopAutoplayIcon={<Icon name="Pause" />}
			stopAutoplayText="Stop Autoplay"
		>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Display custom autoplay toggle",
};

export const IndicatorsDots = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			indicators="dots"
		>
			<Carousel.Item label="Slide 1 of 3">
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 3">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 3">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Indicators dots",
};

export const IndicatorsNone = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			indicators="none"
		>
			<Carousel.Item label="Slide 1 of 3">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 3">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 3">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Indicators none",
};

export const IndicatorsThumbnails = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			indicators="thumbnails"
			thumbnails={[
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
			]}
		>
			<Carousel.Item label="Slide 1 of 3">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 3">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 3">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Indicators thumbnails",
};

export const IndicatorsThumbnailsWithManyImages = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			indicators="thumbnails"
			thumbnails={[
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />,
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />,
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />,
			]}
		>
			<Carousel.Item label="Slide 1 of 15">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 15">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 15">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 15">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 15">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 6 of 15">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 7 of 15">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 8 of 15">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 9 of 15">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 10 of 15">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 11 of 15">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 12 of 15">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 13 of 15">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 14 of 15">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 15 of 15">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Indicators thumbnails with many images",
};

export const NoAdditionalSlideControlsWillBeShownIfOneSlideAndOptedInToAdditionSlideControls = {
	render: () => (
		<Carousel id="carousel-1" label="Carousel of Images" showAdditionalSlideControls>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),

	name: "No additional slide controls will be shown if one slide and opted in to addition slide controls",
};

export const NoAdditionalSlides = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={4}
			nextButton={<button type="button">Next</button>}
			previousButton={<button type="button">Previous</button>}
		>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),
};

export const RtlCarousel = {
	render: () => (
		<div dir="rtl">
			<Carousel
				id="carousel-1"
				label="Carousel of Images"
				nextButton={
					<Carousel.Button id="carousel-1" label="Next Slide">
						<Icon name="ArrowRight" />
					</Carousel.Button>
				}
				previousButton={
					<Carousel.Button id="carousel-1" label="Previous Slide">
						<Icon name="ArrowLeft" />
					</Carousel.Button>
				}
			>
				<Carousel.Item label="Slide 1 of 6">
					{({ viewable }) => (
						<a href="/" aria-hidden={viewable ? null : true} tabIndex={viewable ? null : "-1"}>
							<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
						</a>
					)}
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 6">
					<a href="/">
						<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 6">
					<a href="/">
						<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 6">
					<a href="/">
						<Image src="/coffee.jpeg" alt="A cup of coffee" />
					</a>
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 6">
					{({ viewable }) => (
						<div>
							<a href="/" aria-hidden={viewable ? null : true} tabIndex={viewable ? null : "-1"}>
								<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
							</a>
						</div>
					)}
				</Carousel.Item>
				<Carousel.Item label="Slide 6 of 6">
					<a href="/">
						<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
					</a>
				</Carousel.Item>
			</Carousel>
		</div>
	),

	name: "RTL Carousel",
};

export const ShowAdditionalControls = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			showAdditionalSlideControls
		>
			<Carousel.Item label="Slide 1 of 4">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Show additional controls",
};

export const ShowAdditionalCustomControlsAndShowFullScreenToggle = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			showAdditionalSlideControls
			enableFullScreen
			additionalNextButton={
				<button type="button">
					Custom Next
					<Icon name="ArrowRight" fill="green" />
				</button>
			}
			additionalPreviousButton={
				<button type="button">
					<Icon name="ArrowLeft" fill="red" />
					Custom Previous
				</button>
			}
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 4">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 4">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Show additional custom controls and show full screen toggle",
};

export const ShowCustomFullScreenToggle = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			enableFullScreen
			fullScreenShowButton={
				<button type="button">
					<Icon name="Fullscreen" />
					Expand
				</button>
			}
			fullScreenMinimizeButton={
				<button type="button" aria-label="Close">
					<Icon name="Close" />
				</button>
			}
		>
			<Carousel.Item label="Slide 1 of 1">
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
			</Carousel.Item>
		</Carousel>
	),
};

export const ShowCustomFullScreenToggleWithMultipleSlides = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			enableFullScreen
			fullScreenShowButton={
				<button type="button">
					<Icon name="Fullscreen" />
					Expand
				</button>
			}
			fullScreenMinimizeButton={
				<button type="button" aria-label="Close">
					<Icon name="Close" />
				</button>
			}
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const ShowCustomLabelText = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			enableFullScreen
			pageCountPhrase={(current, total) => `${current} of ${total} cool images`}
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const ShowFullScreenToggle = {
	render: () => (
		<Carousel id="carousel-1" label="Carousel of Images" enableFullScreen>
			<Carousel.Item label="Slide 1 of 1">
				<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
			</Carousel.Item>
		</Carousel>
	),
};

export const ShowWithLabelAndFullScreenToggleWithMultipleSlides = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			showLabel
			enableFullScreen
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const SingleSlide = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			nextButton={<button type="button">Next</button>}
			previousButton={<button type="button">Previous</button>}
		>
			<Carousel.Item label="Slide 1 of 1">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const SingleSlideDisplay = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			nextButton={<button type="button">Next</button>}
			previousButton={<button type="button">Previous</button>}
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};

export const ThreeSlidesAutoplay = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			nextButton={<button type="button">Next</button>}
			previousButton={<button type="button">Previous</button>}
			enableAutoplay
			showLabel
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 4">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Three slides autoplay",
};

export const TwoSlidesAutoplay = {
	render: () => (
		<Carousel
			id="carousel-1"
			label="Carousel of Images"
			slidesToShow={1}
			nextButton={<button type="button">Next</button>}
			previousButton={<button type="button">Previous</button>}
			enableAutoplay
			showLabel
		>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
		</Carousel>
	),

	name: "Two slides autoplay",
};

export const WithLabelAndMultipleSlidesShowingOne = {
	render: () => (
		<Carousel id="carousel-1" label="Carousel of Images" showLabel slidesToShow={1}>
			<Carousel.Item label="Slide 1 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
			<Carousel.Item label="Slide 2 of 5">
				<Image src="/camera.jpeg" alt="A camera with photos in front of it" />
			</Carousel.Item>
			<Carousel.Item label="Slide 3 of 5">
				<Image src="/canyon.jpeg" alt="Landscape view of a canyon" />
			</Carousel.Item>
			<Carousel.Item label="Slide 4 of 5">
				<Image src="/coffee.jpeg" alt="A cup of coffee" />
			</Carousel.Item>
			<Carousel.Item label="Slide 5 of 5">
				<a href="/">
					<Image src="/computer-user.jpeg" alt="A person sat down using a laptop computer" />
				</a>
			</Carousel.Item>
		</Carousel>
	),
};
