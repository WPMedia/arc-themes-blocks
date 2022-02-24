import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useEditableContent } from "fusion:content";

import { useFusionContext } from "fusion:context";
import {
	Byline,
	HeadingSection,
	Overline,
	PromoDate,
	PromoDescription,
	PromoHeadline,
	PromoImage,
} from "@wpmedia/shared-styles";
import {
	extractVideoEmbedFromStory,
	// presentational component does not do data fetching
	VideoPlayer as VideoPlayerPresentational,
} from "@wpmedia/engine-theme-sdk";

import "@wpmedia/shared-styles/scss/_extra-large-promo.scss";

const ExtraLargePromoPresentation = ({
	content,
	playVideoInPlace,
	showHeadline,
	showImage,
	showDescription,
	showByline,
	showDate,
	shrinkToFit,
	description,
	viewportPercentage,
	showOverline,
	imageOverrideURL,
	imageURL,
	imageRatio,
	lazyLoad,
	overline,
	overlineURL,
	linkURL,
	headline,
	newTab,
}) => {
	const { id, isAdmin } = useFusionContext();
	const { searchableField } = useEditableContent();

	const promoImageURL = content ? imageOverrideURL : imageURL;
	const imageSearchField = content ? "imageOverrideURL" : "imageURL";
	const videoEmbed = playVideoInPlace && extractVideoEmbedFromStory(content);

	return (
		<HeadingSection>
			<article
				className={`container-fluid xl-large-promo ${content ? "" : "xl-large-manual-promo"}`}
			>
				<div className="row">
					{(showOverline ||
						showHeadline ||
						!!videoEmbed ||
						showImage ||
						showDescription ||
						showByline ||
						showDate) && (
						<div
							className="col-sm-xl-12 flex-col"
							style={{ position: isAdmin ? "relative" : null }}
						>
							{showOverline ? (
								<Overline story={content} editable customText={overline} customUrl={overlineURL} />
							) : null}
							{showHeadline ? (
								<PromoHeadline
									content={content}
									link={linkURL}
									text={headline}
									newTab={newTab}
									headingClassName="xl-promo-headline"
									linkClassName="xl-promo-headline"
								/>
							) : null}
							{(!!videoEmbed && (
								<VideoPlayerPresentational
									id={id}
									embedMarkup={videoEmbed}
									enableAutoplay={false}
									shrinkToFit={shrinkToFit}
									viewportPercentage={viewportPercentage}
								/>
							)) ||
								(showImage && (
									<div {...searchableField(imageSearchField)} suppressContentEditableWarning>
										<PromoImage
											content={content}
											customImageURL={promoImageURL}
											linkURL={linkURL}
											showPromoLabel
											promoSize="XL"
											newTab={newTab}
											promoLabelSize="large"
											imageRatio={imageRatio}
											lazyLoad={lazyLoad}
											alt={headline}
										/>
									</div>
								))}
							{showDescription ? (
								<PromoDescription
									className="description-text"
									text={description}
									content={content}
								/>
							) : null}
							<div className="article-meta">
								{showByline ? (
									<Byline content={content} font="Primary" list separator={showDate} />
								) : null}
								{showDate ? <PromoDate content={content} /> : null}
							</div>
						</div>
					)}
				</div>
			</article>
			<hr />
		</HeadingSection>
	);
};

ExtraLargePromoPresentation.propTypes = {
	content: PropTypes.object,
	showOverline: PropTypes.bool,
	showHeadline: PropTypes.bool,
	imageOverrideURL: PropTypes.string,
	imageRatio: PropTypes.string,
	showByline: PropTypes.bool,
	showDate: PropTypes.bool,
	showDescription: PropTypes.bool,
	showImage: PropTypes.bool,
	description: PropTypes.string,
	headline: PropTypes.string,
	imageURL: PropTypes.string,
	linkURL: PropTypes.string,
	lazyLoad: PropTypes.bool,
	newTab: PropTypes.bool,
	playVideoInPlace: PropTypes.bool,
	viewportPercentage: PropTypes.bool,
	overline: PropTypes.string,
	overlineURL: PropTypes.string,
	shrinkToFit: PropTypes.bool,
};

export default ExtraLargePromoPresentation;
