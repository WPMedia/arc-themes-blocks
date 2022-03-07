import React from "react";
import { Heading } from "@wpmedia/shared-styles";
import { Image } from "@wpmedia/engine-theme-sdk";

const StoryItem = (props) => {
	const {
		itemTitle = "",
		imageURL = "",
		id = "",
		websiteURL,
		showHeadline,
		showImage,
		resizedImageOptions,
		placeholderResizedImageOptions,
		targetFallbackImage,
		imageProps,
	} = props;

	return (
		<article key={id} className="list-item-simple simple-list-item-margins">
			{showImage ? (
				<a href={websiteURL} className="simple-list-anchor" aria-hidden="true" tabIndex="-1">
					<Image
						{...imageProps}
						url={imageURL !== "" ? imageURL : targetFallbackImage}
						alt={imageURL !== "" ? itemTitle : imageProps?.primaryLogoAlt}
						resizedImageOptions={
							imageURL !== "" ? resizedImageOptions : placeholderResizedImageOptions
						}
					/>
				</a>
			) : null}
			{showHeadline && itemTitle !== "" ? (
				<a className="simple-list-headline-anchor" href={websiteURL}>
					<Heading className="simple-list-headline-text">{itemTitle}</Heading>
				</a>
			) : null}
		</article>
	);
};

export default StoryItem;
