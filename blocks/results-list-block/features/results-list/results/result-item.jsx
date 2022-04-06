import React from "react";

import ArticleDate from "@wpmedia/date-block";
import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Byline, Heading, SecondaryFont, Overline } from "@wpmedia/shared-styles";

const ResultItem = React.memo(
	React.forwardRef(
		(
			{
				arcSite,
				element,
				imageProperties,
				targetFallbackImage,
				placeholderResizedImageOptions,
				showByline,
				showDate,
				showDescription,
				showHeadline,
				showImage,
				showItemOverline,
			},
			ref
		) => {
			const {
				description: { basic: descriptionText } = {},
				display_date: displayDate,
				headlines: { basic: headlineText } = {},
				websites,
			} = element;

			const imageURL = extractImageFromStory(element);
			const url = websites[arcSite].website_url;
			return (
				<div className={`list-item ${!showImage ? "no-image" : ""}`} ref={ref}>
					{showImage ? (
						<div className="results-list--image-container">
							<a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
								<Image
									{...imageProperties}
									url={imageURL !== null ? imageURL : targetFallbackImage}
									alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
									resizedImageOptions={
										imageURL !== null
											? extractResizedParams(element)
											: placeholderResizedImageOptions
									}
								/>
							</a>
						</div>
					) : null}
					{showItemOverline || showHeadline ? (
						<div className="results-list--headline-container">
							{showItemOverline ? <Overline story={element} /> : null}
							{showHeadline ? (
								<a href={url} title={headlineText}>
									<Heading className="headline-text">{headlineText}</Heading>
								</a>
							) : null}
						</div>
					) : null}
					{showDescription || showDate || showByline ? (
						<div className="results-list--description-author-container">
							{showDescription && descriptionText ? (
								<a href={url} title={headlineText}>
									<SecondaryFont as="p" className="description-text">
										{descriptionText}
									</SecondaryFont>
								</a>
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
		}
	)
);

export default ResultItem;
