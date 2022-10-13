import React, { useEffect, useState } from "react";
import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";

import {
	Button,
	Icon,
	Image,
	Paragraph,
	Stack,
	imageANSToImageSrc,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-product-gallery";

const ThumbnailBar = ({ images, selectedIndex, onImageSelect }) => {
	const thumbnailBarItemLimit = 3;
	const getImageIndexById = (id) => images.findIndex((image) => image._id === id);
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(selectedIndex);
	const [thumbnailBarStartIndex, setThumbnailBarStartIndex] = useState(selectedIndex);

	const shouldShowDownButton = () =>
		images.length >= thumbnailBarItemLimit &&
		thumbnailBarStartIndex + thumbnailBarItemLimit < images.length;

	const shouldShowUpButton = () => thumbnailBarStartIndex !== 0;

	/*
	useEffect(() => {
		//  thumbnailBarItemLimit
		//  selectedThumbnailIndex
		//  productImages.length
		// 	thumbnailBarStartIndex
		// 	setThumbnailBarStartIndex
	}, [selectedThumbnailIndex]);
	*/

	return (
		<div className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar`}>
			<Paragraph>
				{selectedThumbnailIndex + 1} / {images.length}
			</Paragraph>
			{shouldShowUpButton() ? (
				<Button
					accessibilityLabel="Previous Image"
					onClick={() => setThumbnailBarStartIndex(thumbnailBarStartIndex - 1)}
				>
					<Icon name="ChevronUp" />
				</Button>
			) : (
				<div className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-bar-spacer`} />
			)}
			<Stack alignment="center" direction="vertical" justifacation="start">
				{images
					.filter(
						(_, index) =>
							index >= Math.min(thumbnailBarStartIndex, images.length - thumbnailBarItemLimit) &&
							index < thumbnailBarStartIndex + thumbnailBarItemLimit
						// as long as selected index is less than the length of the product images minus the window
					)
					.map((image) => (
						<Image
							// used as part of a page design so empty string alt text
							alt=""
							className={`${BLOCK_CLASS_NAME}__focus-view-thumbnail-image${
								image._id === images[selectedThumbnailIndex]._id ? "--selected" : ""
							}`}
							height={100}
							key={`focus-view-thumbnail-${image._id}`}
							onClick={() => {
								onImageSelect(getImageIndexById(image._id));
								setSelectedThumbnailIndex(getImageIndexById(image._id));
							}}
							resizedOptions={{ auth: image.auth[RESIZER_APP_VERSION] }}
							resizerURL={RESIZER_URL}
							responsiveImages={[120]}
							src={imageANSToImageSrc(image)}
							width={100}
						/>
					))}
			</Stack>
			{shouldShowDownButton() ? (
				<Button
					accessibilityLabel="Next Image"
					onClick={() => setThumbnailBarStartIndex(thumbnailBarStartIndex + 1)}
				>
					<Icon name="ChevronDown" />
				</Button>
			) : null}
		</div>
	);
};

export default ThumbnailBar;
