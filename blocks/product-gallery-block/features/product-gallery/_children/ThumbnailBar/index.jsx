import React, { useEffect, useRef, useState } from "react";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";

import {
	Button,
	Icon,
	Image,
	Stack,
	imageANSToImageSrc,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

const ThumbnailBar = ({ images, selectedIndex, onImageSelect }) => {
	const getImageIndexById = (id) => images.findIndex((image) => image._id === id);
	const [viewableItems, setViewableItems] = useState([...Array(3).keys()]);

	const phrases = usePhrases();

	const upButtonRef = useRef();
	const downButtonRef = useRef();
	const imageContainerRef = useRef();
	const indicatorRef = useRef();
	const thumbnailBarRef = useRef();
	const shouldShowDownButton = viewableItems[viewableItems.length - 1] < images.length - 1;

	const shouldShowUpButton = viewableItems[0] > 0;

	const getAvailableSpots = () => {
		const upButtonHeight = upButtonRef.current?.getBoundingClientRect().height || 0;
		const downButtonHeight = downButtonRef.current?.getBoundingClientRect().height || 0;
		const indicatorHeight = indicatorRef.current.getBoundingClientRect().height;
		const windowHeight = window.innerHeight || 0;

		let imageContainerGap = Number.parseInt(
			window.getComputedStyle(imageContainerRef.current.firstChild).getPropertyValue("gap"),
			10
		);

		imageContainerGap = Number.isNaN(imageContainerGap) ? 0 : imageContainerGap;

		const thumbnailBarTopPadding = Number.parseInt(
			window.getComputedStyle(thumbnailBarRef.current).getPropertyValue("padding-top") || 0,
			10
		);
		const thumbnailBarBottomPadding = Number.parseInt(
			window.getComputedStyle(thumbnailBarRef.current).getPropertyValue("padding-bottom") || 0,
			10
		);
		const availableHeight =
			windowHeight -
			upButtonHeight -
			downButtonHeight -
			indicatorHeight -
			thumbnailBarTopPadding -
			thumbnailBarBottomPadding;

		return Math.floor(availableHeight / (100 + imageContainerGap));
	};

	useEffect(() => {
		const spots = viewableItems.length;
		const defaultViewable = [...Array(spots).keys()];
		let viewables = [];
		if (selectedIndex - spots >= 0) {
			const updatedViewable = [];
			defaultViewable.forEach((_, iX) => {
				updatedViewable.push(selectedIndex - iX);
			});
			viewables = updatedViewable.reverse();
		} else {
			viewables = defaultViewable;
		}
		setViewableItems(viewables);
	}, [selectedIndex, viewableItems.length]);

	useEffect(() => {
		const windowResize = () => {
			setViewableItems([...Array(getAvailableSpots()).keys()]);
		};
		window.addEventListener("resize", windowResize);
		return () => window.removeEventListener("resize", windowResize);
	}, [upButtonRef, downButtonRef, imageContainerRef, indicatorRef, thumbnailBarRef]);

	useEffect(() => {
		setViewableItems([...Array(getAvailableSpots()).keys()]);
	}, []);

	return (
		<div className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar`} ref={thumbnailBarRef}>
			<Stack alignment="center" direction="vertical" justification="start">
				<p className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar-indicator`} ref={indicatorRef}>
					{selectedIndex + 1} / {images.length}
				</p>
				{shouldShowUpButton ? (
					<Button
						accessibilityLabel={phrases.t("product-gallery.focus-thumbnail-previous")}
						onClick={() => {
							const inViewItems = viewableItems;
							const firstItem = inViewItems.pop();
							inViewItems.unshift(firstItem - 1);

							setViewableItems([...inViewItems]);
						}}
						ref={upButtonRef}
					>
						<Icon name="ChevronUp" />
					</Button>
				) : null}
				<div ref={imageContainerRef}>
					<Stack
						alignment="center"
						direction="vertical"
						justification="start"
						className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar-images`}
					>
						{images
							.filter((_, index) => viewableItems.indexOf(index) !== -1)
							.map((image) => (
								<Image
									// used as part of a page design so empty string alt text
									alt=""
									className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-image ${
										image._id === images[selectedIndex]._id
											? `${BLOCK_CLASS_NAME}__focus-view-thumbnail-image--selected`
											: ""
									}`}
									height={100}
									key={`focus-view-thumbnail-${image._id}`}
									onClick={() => {
										onImageSelect(getImageIndexById(image._id));
									}}
									resizedOptions={{ auth: image.auth[RESIZER_APP_VERSION] }}
									resizerURL={RESIZER_URL}
									responsiveImages={[120]}
									src={imageANSToImageSrc(image)}
									width={100}
								/>
							))}
					</Stack>
				</div>
				{shouldShowDownButton ? (
					<Button
						accessibilityLabel={phrases.t("product-gallery.focus-thumbnail-next")}
						onClick={() => {
							const [, ...rest] = viewableItems;
							const nextItem = viewableItems[viewableItems.length - 1] + 1;

							setViewableItems([...rest, nextItem]);
						}}
						ref={downButtonRef}
					>
						<Icon name="ChevronDown" />
					</Button>
				) : null}
			</Stack>
		</div>
	);
};

export default ThumbnailBar;
