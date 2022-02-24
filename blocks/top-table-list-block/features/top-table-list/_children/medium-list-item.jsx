import React from "react";
import {
	Byline,
	HeadingSection,
	PromoDate,
	PromoDescription,
	PromoHeadline,
	PromoImage,
} from "@wpmedia/shared-styles";

const MediumListItem = (props) => {
	const { element, id, customFields } = props;
	const showBottomBorder =
		typeof customFields.showBottomBorderMD === "undefined" ? true : customFields.showBottomBorderMD;

	return (
		<HeadingSection>
			<article className="container-fluid medium-promo" key={id}>
				<div
					className={`promo-item-margins medium-promo-wrapper ${
						customFields.showImageMD ? "md-promo-image" : ""
					}`}
				>
					{customFields.showImageMD && (
						<div className="image-link">
							<PromoImage
								content={element}
								showPromoLabel
								promoSize="MD"
								promoLabelSize="large"
								imageRatio={customFields.imageRatioMD}
								lazyLoad={customFields.lazyLoad}
							/>
						</div>
					)}
					{
						/* customFields.headlinePositionMD === 'below' && */
						(customFields.showHeadlineMD ||
							customFields.showDescriptionMD ||
							customFields.showBylineMD ||
							customFields.showDateMD) && (
							<>
								{customFields.showHeadlineMD ? (
									<PromoHeadline
										content={element}
										headingClassName="md-promo-headline-text"
										className="md-promo-headline"
										editable={false}
									/>
								) : null}
								{customFields.showDescriptionMD ? (
									<PromoDescription
										className="description-text"
										content={element}
										editable={false}
									/>
								) : null}
								<div className="article-meta">
									{customFields.showBylineMD ? (
										<Byline
											content={element}
											font="Primary"
											list
											separator={customFields.showDateMD}
										/>
									) : null}
									{customFields.showDateMD ? <PromoDate content={element} /> : null}
								</div>
							</>
						)
					}
				</div>
			</article>
			<hr className={!showBottomBorder ? "hr-borderless" : ""} />
		</HeadingSection>
	);
};

export default MediumListItem;
