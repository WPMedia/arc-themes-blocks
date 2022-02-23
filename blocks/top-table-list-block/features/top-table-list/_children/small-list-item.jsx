import React from "react";
import { HeadingSection, PromoHeadline, PromoImage } from "@wpmedia/shared-styles";
import { LEFT, RIGHT, ABOVE, BELOW } from "../shared/imagePositionConstants";

const SmallListItem = (props) => {
	const {
		id,
		element,
		customFields: {
			imagePositionSM: imagePosition = RIGHT,
			storiesPerRowSM,
			showHeadlineSM,
			showImageSM,
			showBottomBorderSM,
			imageRatioSM,
		},
	} = props;

	const storiesPerRow = typeof storiesPerRowSM === "undefined" ? 2 : storiesPerRowSM;
	const layout = imagePosition === ABOVE || imagePosition === BELOW ? "vertical" : "horizontal";
	const showBottomBorder = typeof showBottomBorderSM === "undefined" ? true : showBottomBorderSM;

	const colClassNum = (!!storiesPerRow && Math.floor(12 / storiesPerRow)) || 1;
	const colClasses = `col-sm-12 col-md-${colClassNum} col-lg-${colClassNum} col-xl-${colClassNum}`;

	const Headline = showHeadlineSM ? (
		<PromoHeadline
			content={element}
			className="headline-wrap"
			linkClassName="sm-promo-headline"
			headingClassName="sm-promo-headline"
			editable={false}
		/>
	) : null;

	const Image = showImageSM ? (
		<PromoImage
			content={element}
			showPromoLabel
			promoSize="SM"
			imageRatio={imageRatioSM}
			editable={false}
		/>
	) : null;

	return (
		<HeadingSection>
			<article
				key={id}
				className={`top-table-list-small-promo small-promo ${colClasses} ${layout}`}
			>
				<div
					className={`promo-container row ${layout} ${
						imagePosition === BELOW ? "image-below" : ""
					} sm-promo-padding-btm`}
				>
					{imagePosition === ABOVE || imagePosition === LEFT ? (
						<>
							{Image}
							{Headline}
						</>
					) : (
						<>
							{Headline}
							{Image}
						</>
					)}
				</div>
				<hr className={!showBottomBorder ? "hr-borderless" : ""} />
			</article>
		</HeadingSection>
	);
};
export default SmallListItem;
