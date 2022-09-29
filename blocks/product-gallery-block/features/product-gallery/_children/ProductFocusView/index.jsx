import React, { useEffect, useState, useRef } from "react";

import {
	Button,
	Icon,
	Image,
	Paragraph,
	Stack,
	imageANSToImageSrc,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

const ProductFocusView = ({
	initialItemId,
	onClose,
	productImages,
	resizerAppVersion,
	resizerURL,
}) => {
	const thumbnailBarItemLimit = 5;
	const getImageIndexById = (id) => productImages.findIndex((image) => image._id === id);
	const mainImagesRef = useRef([]);
	const [selectedImageIndex, setSelectedImageIndex] = useState(getImageIndexById(initialItemId));
	const [thumbnailBarStartIndex, setThumbnailBarStartIndex] = useState(selectedImageIndex);

	const shouldShowDownButton = () =>
		productImages.length >= thumbnailBarItemLimit &&
		thumbnailBarStartIndex + thumbnailBarItemLimit < productImages.length;

	const shouldShowUpButton = () => thumbnailBarStartIndex !== 0;

	useEffect(() => {
		let scrollTimeout;
		const scrollImageIntoView = () => {
			const currentImageContainer = mainImagesRef.current?.[selectedImageIndex];
			if (currentImageContainer?.querySelector("img").complete) {
				currentImageContainer.scrollIntoView();
			} else {
				scrollTimeout = setTimeout(scrollImageIntoView, 10);
			}
		};
		scrollImageIntoView();
		return () => clearTimeout(scrollTimeout);
	}, [selectedImageIndex, mainImagesRef]);

	return (
		<div className={`${BLOCK_CLASS_NAME}__focus-view`}>
			<Stack direction="horizontal" justifacation="start">
				<div className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar`}>
					<Paragraph>
						{selectedImageIndex + 1} / {productImages.length}
					</Paragraph>
					{shouldShowUpButton() ? (
						<Button onClick={() => setThumbnailBarStartIndex(thumbnailBarStartIndex - 1)}>
							<Icon name="ChevronUp" />
						</Button>
					) : (
						<div className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar-spacer`} />
					)}
					<Stack alignment="center" direction="vertical" justifacation="start">
						{productImages
							.filter(
								(_, index) =>
									index >=
										Math.min(
											thumbnailBarStartIndex,
											productImages.length - thumbnailBarItemLimit
										) && index < thumbnailBarStartIndex + thumbnailBarItemLimit
								// as long as selected index is less than the length of the product images minus the window
							)
							.map((image) => (
								<Image
									// used as part of a page design so empty string alt text
									alt=""
									className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-image${
										image._id === productImages[selectedImageIndex]._id ? "--selected" : ""
									}`}
									height={100}
									key={image._id}
									onClick={() => setSelectedImageIndex(getImageIndexById(image._id))}
									resizedOptions={{ auth: image.auth[resizerAppVersion] }}
									resizerURL={resizerURL}
									responsiveImages={[120]}
									src={imageANSToImageSrc(image)}
									width={100}
								/>
							))}
					</Stack>
					{shouldShowDownButton() ? (
						<Button onClick={() => setThumbnailBarStartIndex(thumbnailBarStartIndex + 1)}>
							<Icon name="ChevronDown" />
						</Button>
					) : null}
				</div>
				<Stack
					alignment="center"
					direction="vertical"
					className={`${BLOCK_CLASS_NAME}__focus-view-main-images`}
				>
					{productImages.map((image, index) => (
						<div
							style={{ flexBasis: "100vh", flexShrink: 0 }}
							key={image._id}
							ref={(element) => {
								mainImagesRef.current[index] = element;
							}}
						>
							<Image
								// used as part of a page design so empty string alt text
								alt=""
								className={`${BLOCK_CLASS_NAME}__focus-view-main-image`}
								loading={index === selectedImageIndex ? "eager" : "lazy"}
								resizedOptions={{ auth: image.auth[resizerAppVersion] }}
								resizerURL={resizerURL}
								responsiveImages={[150, 375, 500, 1500, 2000]}
								src={imageANSToImageSrc(image)}
							/>
						</div>
					))}
				</Stack>
				<div className={`${BLOCK_CLASS_NAME}__focus-view-toolbar`}>
					<Button accessibilityLabel="TODO" onClick={onClose} size="large" variant="reverse">
						<Icon name="Close" />
					</Button>
				</div>
			</Stack>
		</div>
	);
};

export default ProductFocusView;
