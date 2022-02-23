import React from "react";
import getProperties from "fusion:properties";

import ArticleDate from "@wpmedia/date-block";
import { Image } from "@wpmedia/engine-theme-sdk";
import { extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Byline, Heading, SecondaryFont } from "@wpmedia/shared-styles";

const SearchResult = ({
	element,
	arcSite,
	targetFallbackImage,
	resizedImageOptions,
	promoElements = {},
	imageProps,
}) => {
	const {
		description: { basic: descriptionText } = {},
		headlines: { basic: headlineText } = {},
		display_date: displayDate,
		websites = {},
	} = element;
	if (!websites[arcSite]) {
		return null;
	}

	const url = websites[arcSite].website_url;
	const { showHeadline, showImage, showDescription, showByline, showDate } = promoElements;

	return (
		<div className={`list-item ${!showImage ? "no-image" : ""}`} key={`result-card-${url}`}>
			{showImage ? (
				<div className="results-list--image-container">
					<a href={url} className="list-anchor" aria-hidden="true" tabIndex="-1">
						<Image
							{...imageProps}
							url={
								extractImageFromStory(element)
									? extractImageFromStory(element)
									: targetFallbackImage
							}
							alt={
								extractImageFromStory(element)
									? headlineText
									: getProperties(arcSite).primaryLogoAlt
							}
							resizedImageOptions={resizedImageOptions}
						/>
					</a>
				</div>
			) : null}
			{showHeadline ? (
				<div className="results-list--headline-container">
					<a href={url} className="list-anchor">
						<Heading className="headline-text">{headlineText}</Heading>
					</a>
				</div>
			) : null}
			{showDescription || showDate || showByline ? (
				<div className="results-list--description-author-container">
					{showDescription ? (
						<SecondaryFont as="p" className="description-text">
							{descriptionText}
						</SecondaryFont>
					) : null}
					{showDate || showByline ? (
						<div className="results-list--author-date">
							{showByline ? (
								<Byline content={element} list separator={showDate} font="Primary" />
							) : null}
							{showDate ? <ArticleDate classNames="story-date" date={displayDate} /> : null}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default SearchResult;
