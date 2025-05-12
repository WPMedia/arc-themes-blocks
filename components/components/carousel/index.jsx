import { Children, cloneElement, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import Icon from "../icon";
import Button from "./_children/Button";
import Item from "./_children/Item";
import EventEmitter from "../../utils/event-emitter";
import useInterval from "../../utils/hooks/use-interval";
import isServerSide from "../../utils/is-server-side";
import DotIndicatorArea from "./_children/DotIndicatorArea";
import ThumbnailIndicatorArea from "./_children/ThumbnailIndicatorArea";

const COMPONENT_CLASS_NAME = "c-carousel";
const BUTTON_BASE_CLASS_NAME = `${COMPONENT_CLASS_NAME}__button`;
const ICON_BASE_CLASS_NAME = `${COMPONENT_CLASS_NAME}__icon`;

const getFullScreenClassName = (className, isFullScreen) =>
	isFullScreen ? `${className} ${className}--fullscreen` : className;

const DefaultNextButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Next Slide"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--next`}
	>
		Next
	</Button>
);

const DefaultPreviousButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Previous Slide"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--previous`}
	>
		Previous
	</Button>
);

const resolvedIcon = (element, isFullScreen) =>
	cloneElement(element, {
		className: `${getFullScreenClassName(`${ICON_BASE_CLASS_NAME}`, isFullScreen)} ${
			element?.props?.className || ""
		}`,
	});

const DefaultAdditionalPreviousButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Previous Slide"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--additional-previous`}
	>
		{resolvedIcon(<Icon name="ChevronLeft" />, isFullScreen)}
	</Button>
);

const DefaultAdditionalNextButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Next Slide"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--additional-next`}
	>
		{resolvedIcon(<Icon name="ChevronLeft" />, isFullScreen)}
	</Button>
);

/* istanbul ignore next  */
const DefaultExitFullScreenButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Exit full screen mode displaying the carousel"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--exit-full-screen`}
	>
		Minimize Screen
	</Button>
);

const DefaultEnterFullScreenButton = ({ id, onClick, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Enter full screen mode displaying the carousel"
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--enter-full-screen`}
	>
		Full Screen
	</Button>
);

const AutoplayButton = ({ id, onClick, iconNode, text, ariaLabel, isFullScreen }) => (
	<Button
		id={id}
		onClick={onClick}
		label={ariaLabel}
		className={`${getFullScreenClassName(
			`${BUTTON_BASE_CLASS_NAME}`,
			isFullScreen
		)} ${BUTTON_BASE_CLASS_NAME}--toggle-auto-play`}
	>
		{iconNode && resolvedIcon(iconNode, isFullScreen)}
		{text}
	</Button>
);

const resolvedButton = (element, id, className, onClick, isFullScreen, cloneIcon = true) => {
	const { children } = element.props;

	return cloneElement(element, {
		"aria-controls": id,
		onClick: (e) => {
			onClick();
			if (element.props?.onClick) {
				element.props.onClick(e);
			}
		},
		className: `${getFullScreenClassName(`${BUTTON_BASE_CLASS_NAME}`, isFullScreen)} ${className} ${
			element.props?.className || ""
		}`,
		children: cloneIcon
			? Children.map(children, (child) =>
					child.type === Icon ? resolvedIcon(cloneElement(child), isFullScreen) : child
			  )
			: children,
	});
};

const getSlidesToShowFromDom = (id) =>
	parseInt(window?.getComputedStyle(id)?.getPropertyValue("--viewable-slides") || 4, 10);

const insertAdsIntoItems = (carouselItems, adElement, adInterstitialClicks, slide) => {
	for (
		let itemIndex = adInterstitialClicks;
		itemIndex < carouselItems.length;
		itemIndex += adInterstitialClicks + 1
	) {
		carouselItems.splice(
			itemIndex,
			0,
			slide === itemIndex + 1 ? (
				cloneElement(adElement, {
					className: `${COMPONENT_CLASS_NAME}__slide`,
					key: `ad-${itemIndex}`,
				})
			) : (
				<div className={`${COMPONENT_CLASS_NAME}__slide`} key={`ad-placeholder-${itemIndex}`} />
			)
		);
	}

	return carouselItems;
};

const Carousel = ({
	additionalNextButton,
	additionalPreviousButton,
	adElement,
	adInterstitialClicks,
	autoplayPhraseLabels,
	children,
	className,
	enableAutoplay,
	enableFullScreen,
	fullScreenMinimizeButton,
	fullScreenShowButton,
	id,
	indicators,
	goToSlidePhrase,
	label,
	nextButton,
	pageCountPhrase,
	previousButton,
	showAdditionalSlideControls,
	showLabel,
	slidesToShow,
	startAutoplayIcon,
	startAutoplayText,
	stopAutoplayIcon,
	stopAutoplayText,
	thumbnails,
	...rest
}) => {
	const [slidesToShowInView, setSlidesToShowInView] = useState(0);
	const [slide, setSlide] = useState(0);
	const [position, setPosition] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isAutoplaying, setIsAutoplaying] = useState(false);
	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");
	const carouselElement = useRef();

	const subComponents = Object.values(Carousel).map((subcomponentType) =>
		Children.map(children, (child) => (child?.type === subcomponentType ? child : null))
	);

	const childItems = Children.toArray(subComponents);

	let carouselItems = childItems.map((child, index) => {
		const viewable = index + 1 > slide - slidesToShowInView && index + 1 <= slide;
		return child.type === Item ? cloneElement(child, { viewable }) : null;
	});

	const totalSlides = carouselItems.length;

	const emitEvent = useCallback(
		(eventName, page, options) => {
			EventEmitter.dispatch(eventName, {
				eventName,
				ansGalleryId: id,
				ansGalleryHeadline: label,
				orderPosition: page || slide,
				totalImages: totalSlides,
				...options,
			});
		},
		[id, label, slide, totalSlides]
	);

	useEffect(() => {
		setSlidesToShowInView(getSlidesToShowFromDom(carouselElement.current));
		setSlide(getSlidesToShowFromDom(carouselElement.current));
	}, [carouselElement]);

	useEffect(() => {
		const resizeFn = () => {
			const slideOffset =
				carouselElement.current.querySelector(`.c-carousel__slide:nth-of-type(${slide})`)
					?.offsetLeft || 0;
			setPosition(-slideOffset);
		};
		window.addEventListener("resize", resizeFn, false);
		return () => window.removeEventListener("resize", resizeFn, false);
	});

	useEffect(() => {
		const handleFullscreen = () => {
			if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
				if (document.fullscreenElement || document.webkitFullscreenElement) {
					setIsFullScreen(true);
					emitEvent("galleryExpandEnter");
				} else {
					setIsFullScreen(false);
					emitEvent("galleryExpandExit");
				}
			}
		};
		document.addEventListener("fullscreenchange", handleFullscreen);
		return () => window.removeEventListener("fullscreenchange", handleFullscreen, false);
	}, [emitEvent]);

	if (adElement && adInterstitialClicks) {
		carouselItems = insertAdsIntoItems(carouselItems, adElement, adInterstitialClicks, slide);
	}

	const goToSlide = (newSlideIndex) => {
		setSlide(newSlideIndex);
		const slideOffset =
			carouselElement.current.querySelector(`.c-carousel__slide:nth-of-type(${newSlideIndex})`)?.offsetLeft || 0;

		// Calculate the new position based on the target slide's offset
		const newPosition = -slideOffset;
		setPosition(newPosition);
		emitEvent(slide > newSlideIndex ? "galleryImagePrevious" : "galleryImageNext", newSlideIndex, {
			autoplay: isAutoplaying,
		});
	};

	const previousSlide = () => {
		/* istanbul ignore next */
		if (slide - 1 < slidesToShowInView) {
			return;
		}
		goToSlide(slide - 1);
	};

	const nextSlide = () => {
		/* istanbul ignore next */
		if (slide + 1 > carouselItems.length) {
			return;
		}
		goToSlide(slide + 1);
	};

	const autoplayNextSlide = () => {
		/* istanbul ignore next */
		if (slide + 1 > carouselItems.length) {
			setIsAutoplaying(false);
		} else {
			goToSlide(slide + 1);
		}
	};

	// a prefers-reduced-motion user setting must always override Autoplay
	const autoplayEnabledAndAllowed =
		enableAutoplay && !isServerSide() && !!window.matchMedia("'(prefers-reduced-motion: reduce)");

	useInterval(autoplayNextSlide, autoplayEnabledAndAllowed && isAutoplaying ? 4000 : null);

	/* istanbul ignore next  */
	const toggleFullScreen = () => {
		// id is the carousel id
		// the full screen element is the whole carousel
		const fullScreenElement = document.getElementById(id);

		if (document.fullscreenEnabled) {
			if (!document.fullscreenElement) {
				fullScreenElement.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		} else {
			// safari needs prefix
			// eslint-disable-next-line no-lonely-if
			if (document.webkitFullscreenEnabled) {
				if (!document.webkitFullscreenElement) {
					fullScreenElement.webkitRequestFullscreen();
				} else {
					document.webkitExitFullscreen();
				}
			}
		}
	};

	const toggleAutoplay = () => {
		if (!isAutoplaying && slide + 1 >= carouselItems.length) {
			goToSlide(1);
		}

		emitEvent(isAutoplaying ? "galleryAutoplayStop" : "galleryAutoplayStart");
		setIsAutoplaying(!isAutoplaying);
	};

	/* istanbul ignore next */
	const handlers = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => previousSlide(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const resolvedNextButton = nextButton ? (
		resolvedButton(
			nextButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--next`,
			nextSlide,
			isFullScreen,
			false
		)
	) : (
		<DefaultNextButton id={id} onClick={() => nextSlide()} isFullScreen={isFullScreen} />
	);

	const resolvedPreviousButton = previousButton ? (
		resolvedButton(
			previousButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--previous`,
			previousSlide,
			isFullScreen,
			false
		)
	) : (
		<DefaultPreviousButton id={id} onClick={() => previousSlide()} isFullScreen={isFullScreen} />
	);

	const resolvedAdditionalNextButton = additionalNextButton ? (
		resolvedButton(
			additionalNextButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--additional-next`,
			nextSlide,
			isFullScreen
		)
	) : (
		<DefaultAdditionalNextButton id={id} onClick={nextSlide} isFullScreen={isFullScreen} />
	);

	const resolvedAdditionalPreviousButton = additionalPreviousButton ? (
		resolvedButton(
			additionalPreviousButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--additional-previous`,
			previousSlide,
			isFullScreen
		)
	) : (
		<DefaultAdditionalPreviousButton id={id} onClick={previousSlide} isFullScreen={isFullScreen} />
	);

	const resolvedFullScreenShowButton = fullScreenShowButton ? (
		resolvedButton(
			fullScreenShowButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--enter-full-screen`,
			toggleFullScreen,
			isFullScreen
		)
	) : (
		<DefaultEnterFullScreenButton
			btnText={isFullScreen ? "Minimize Screen" : "Full Screen"}
			id={id}
			onClick={toggleFullScreen}
			isFullScreen={isFullScreen}
		/>
	);

	const resolvedFullScreenMinimizeButton = fullScreenMinimizeButton ? (
		resolvedButton(
			fullScreenMinimizeButton,
			id,
			`${BUTTON_BASE_CLASS_NAME}--exit-full-screen`,
			toggleFullScreen,
			isFullScreen,
			false
		)
	) : (
		<DefaultExitFullScreenButton id={id} onClick={toggleFullScreen} isFullScreen={isFullScreen} />
	);

	// check to ensure client-side to make sure document is available
	/* istanbul ignore next  */
	const fullScreenEnabledAllowed =
		!isServerSide() &&
		(document.fullscreenEnabled || document.webkitFullscreenEnabled) &&
		enableFullScreen;

	return (
		<div
			{...rest}
			className={containerClassNames}
			id={id}
			aria-label={label}
			role="region"
			aria-roledescription="carousel"
			style={{
				"--carousel-slide-width": `${100 / (slidesToShowInView || slidesToShow)}%`,
				"--viewable-slides": slidesToShow,
			}}
			ref={carouselElement}
		>
			<div className={`${COMPONENT_CLASS_NAME}__controls`}>
				<div className={`${COMPONENT_CLASS_NAME}__expand-autoplay-container`}>
					{/* only show button at all if enabled on the document */}
					{fullScreenEnabledAllowed && !isFullScreen ? resolvedFullScreenShowButton : null}
					{
						/* istanbul ignore next  */ fullScreenEnabledAllowed && isFullScreen
							? resolvedFullScreenMinimizeButton
							: null
					}
					{autoplayEnabledAndAllowed ? (
						<AutoplayButton
							id={id}
							onClick={toggleAutoplay}
							text={isAutoplaying ? stopAutoplayText : startAutoplayText}
							iconNode={isAutoplaying ? stopAutoplayIcon : startAutoplayIcon}
							ariaLabel={isAutoplaying ? autoplayPhraseLabels.stop : autoplayPhraseLabels.start}
							isFullScreen={isFullScreen}
						/>
					) : null}
				</div>
				<div className={`${COMPONENT_CLASS_NAME}__counter-controls-container`}>
					{showLabel ? (
						<p
							className={`${COMPONENT_CLASS_NAME}__image-counter-label`}
							dangerouslySetInnerHTML={{
								__html: pageCountPhrase(slide, totalSlides) || `${slide} of ${totalSlides}`,
							}}
						/>
					) : null}
					{carouselItems.length > 1 && showAdditionalSlideControls ? (
						<div className={`${COMPONENT_CLASS_NAME}__additional-controls`}>
							{slide !== slidesToShow ? resolvedAdditionalPreviousButton : null}
							{slide !== carouselItems.length && carouselItems.length > 1
								? resolvedAdditionalNextButton
								: null}
						</div>
					) : null}
				</div>
			</div>
			<div
				className={`${COMPONENT_CLASS_NAME}__track`}
				style={{ transform: `translate3d(${position}px, 0px, 0px)` }}
				aria-live={isAutoplaying ? "off" : "polite"}
				{...handlers}
			>
				{carouselItems}
			</div>

			<div className={`${COMPONENT_CLASS_NAME}__actions`}>
				{slide !== slidesToShowInView ? resolvedPreviousButton : null}
				{slide !== carouselItems.length && carouselItems.length > 1 ? resolvedNextButton : null}
			</div>

			{indicators === "thumbnails" ? (
				<ThumbnailIndicatorArea
					currentSlideNumber={slide}
					goToSlide={goToSlide}
					goToSlidePhrase={goToSlidePhrase}
				>
					{thumbnails}
				</ThumbnailIndicatorArea>
			) : null}
			{indicators === "dots" ? (
				<DotIndicatorArea
					currentSlideNumber={slide}
					goToSlide={goToSlide}
					goToSlidePhrase={goToSlidePhrase}
					totalSlideNumber={totalSlides}
				/>
			) : null}
		</div>
	);
};

Carousel.Button = Button;
Carousel.Item = Item;

Carousel.defaultProps = {
	autoplayPhraseLabels: {
		start: "Start automatic slide show",
		stop: "Stop automatic slide show",
	},
	enableAutoplay: false,
	indicators: "none",
	goToSlidePhrase: /* istanbul ignore next  */ (targetSlide) => `Go to slide ${targetSlide}`,
	pageCountPhrase: () => {},
	showLabel: false,
	startAutoplayText: "Start Autoplay",
	stopAutoplayText: "Stop Autoplay",
};

Carousel.propTypes = {
	/** Used to set a custom additional next button, a cloned Carousel.Button element */
	additionalNextButton: PropTypes.node,
	/** Used to set a custom additional previous button, a cloned Carousel.Button element */
	additionalPreviousButton: PropTypes.node,
	/** Ad element to render for each ad placement based on adInterstitialClicks. The Ad will only render when visible, and not when the carousel renders */
	adElement: PropTypes.node,
	/** Number of clicks between Ads (clicks can be in any direction) */
	adInterstitialClicks: PropTypes.number,
	/** Object of phases for stop and start labels of Autoplay button */
	autoplayPhraseLabels: PropTypes.shape({
		start: PropTypes.string,
		stop: PropTypes.string,
	}),
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** Opt into showing an autoplay toggle button */
	enableAutoplay: PropTypes.bool,
	/** Opt into showing a full screen toggle button. Uses defaults if no `fullScreenShowButton` or `fullScreenMinimizeButton` provided for respective button states */
	enableFullScreen: PropTypes.bool,
	/** Used to set a custom full screen exit button, cloned with event handlers */
	fullScreenMinimizeButton: PropTypes.node,
	/** Used to set a custom full screen show button, cloned with event handlers */
	fullScreenShowButton: PropTypes.node,
	/** Internationalization function for handling indicator aria-labels  */
	goToSlidePhrase: PropTypes.func,
	/** A unique identifier for the carousel */
	id: PropTypes.string.isRequired,
	/** Show the current state of the carousel with UI options */
	indicators: PropTypes.oneOf(["none", "dots", "thumbnails"]),
	/** An accessible label */
	label: PropTypes.string.isRequired,
	/** Page count phrase text for internationalization, function takes in current, total */
	pageCountPhrase: PropTypes.func,
	/** Used to set a custom previous button, a cloned Carousel.Button element */
	previousButton: PropTypes.node,
	/** Used to set a custom next button, a cloned Carousel.Button element */
	nextButton: PropTypes.node,
	/** Show next and previous controls in addition to existing ones */
	showAdditionalSlideControls: PropTypes.bool,
	/** Show the current slide number */
	showLabel: PropTypes.bool,
	/** Number of slides to show in view */
	slidesToShow: PropTypes.number,
	/** Icon or dom node that shows to indicate start Autoplay, assuming it's enabled and available to user */
	startAutoplayIcon: PropTypes.node,
	/** Text to display to begin autoplaying the slides if the button is enabled */
	startAutoplayText: PropTypes.string,
	/** Icon or dom node that shows to indicate stop Autoplay, assuming it's enabled and available to user */
	stopAutoplayIcon: PropTypes.node,
	/** Text to display to stop autoplaying the slides if the button is enabled and slideshow is autoplaying */
	stopAutoplayText: PropTypes.string,
	/** Array of thumbnails to show in the thumbnail indicator area */
	thumbnails: PropTypes.arrayOf(PropTypes.node),
};

export default Carousel;
