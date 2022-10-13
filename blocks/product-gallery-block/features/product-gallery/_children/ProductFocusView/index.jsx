import React, { useEffect, useState, useRef } from "react";
// import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";
import { Button, Icon, Stack } from "@wpmedia/arc-themes-components";

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
	/*
	useEffect(() => {
		//  thumbnailBarItemLimit
		//  selectedThumbnailIndex
		//  productImages.length
		// 	thumbnailBarStartIndex
		// 	setThumbnailBarStartIndex
	}, [selectedThumbnailIndex]);
*/

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
		console.log(selectedImageIndex);
		return () => clearTimeout(scrollTimeout);
	}, [selectedImageIndex, mainImagesRef]);

	return (
		<div className={`${BLOCK_CLASS_NAME}__focus-view`}>
			<Stack direction="horizontal" justification="start">
				<ThumbnailBar
					images={productImages}
					selectedIndex={selectedThumbnailIndex}
					onImageSelect={setSelectedImageIndex}
				/>
				{/*
					<ThumbnailBar images={productImages} selectedImage={selectedThumbnailIndex} onImageSelect={(imageId)=>{}} />
				 */}
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
								onVisible={() => {
									setSelectedThumbnailIndex(index);
									console.log("setSelectedThumbnailIndex('", index, "')");
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
			</Stack>
		</div>
	);
};

export default ProductFocusView;
