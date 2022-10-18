import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Icon, Stack } from "@wpmedia/arc-themes-components";

import MainImage from "../MainImage";
import ThumbnailBar from "../ThumbnailBar";

const BLOCK_CLASS_NAME = "b-product-gallery";

const ProductFocusView = ({ initialItemId, onClose, productImages }) => {
	const getImageIndexById = (id) => productImages.findIndex((image) => image._id === id);
	const mainImagesRef = useRef([]);
	const [selectedImageIndex, setSelectedImageIndex] = useState(getImageIndexById(initialItemId));
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(
		getImageIndexById(initialItemId)
	);

	// Scrolls main image into view when thumbnail is selected.
	useEffect(() => {
		let scrollTimeout;
		const scrollImageIntoView = () => {
			mainImagesRef.current?.[selectedImageIndex]
				.querySelector("img")
				?.setAttribute("loading", "eager");
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
			<Grid>
				<ThumbnailBar
					images={productImages}
					selectedIndex={selectedThumbnailIndex}
					onImageSelect={setSelectedImageIndex}
				/>
				<Stack
					alignment="center"
					direction="vertical"
					className={`${BLOCK_CLASS_NAME}__focus-view-main-images`}
				>
					{productImages.map((image, index) => (
						<div
							key={`focus_main_view_${image._id}`}
							ref={(element) => {
								mainImagesRef.current[index] = element;
							}}
						>
							<MainImage
								image={image}
								loading={index === 0 ? "eager" : undefined}
								onVisible={(id) => {
									setSelectedThumbnailIndex(getImageIndexById(id));
								}}
							/>
						</div>
					))}
				</Stack>
				<div className={`${BLOCK_CLASS_NAME}__focus-view-toolbar`}>
					<Button accessibilityLabel="Close" onClick={onClose} size="large" variant="secondary">
						<Icon name="Close" />
					</Button>
				</div>
			</Grid>
		</div>
	);
};

export default ProductFocusView;
