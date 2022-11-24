import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import { localizeDateTime } from "@wpmedia/engine-theme-sdk";

import {
	Attribution,
	Conditional,
	Date as DateComponent,
	Divider,
	formatAuthors,
	formatURL,
	getImageFromANS,
	getPromoType,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Join,
	Link,
	MediaItem,
	Paragraph,
	Separator,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-top-table-list-medium";

const Medium = (props) => {
	const {
		element,
		customFields: {
			showBylineMD,
			showDateMD,
			showDescriptionMD,
			showHeadlineMD,
			showImageMD,
			showBottomBorderMD,
			imageRatioMD = "3:2",
		},
		fallbackImage,
	} = props;

	const { arcSite } = useFusionContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
		},
	} = getProperties(arcSite);
	const phrases = usePhrases();

	const showBottomBorder = typeof showBottomBorderMD === "undefined" ? true : showBottomBorderMD;

	const hasAuthors = showBylineMD ? element?.credits?.by && element?.credits?.by.length : null;
	const contentDescription = showDescriptionMD ? element?.description?.basic : null;
	const contentHeading = showHeadlineMD ? element?.headlines?.basic : null;
	const contentUrl = element?.websites?.[arcSite]?.website_url;

	const contentDate = element?.display_date;
	const formattedDate = Date.parse(contentDate)
		? localizeDateTime(new Date(contentDate), dateTimeFormat, language, timeZone)
		: "";

	const promoType = getPromoType(element);
	const labelIconName = {
		gallery: "Camera",
		video: "Play",
	}[promoType];

	const labelIconText = {
		gallery: phrases.t("global.gallery-text"),
		video: phrases.t("global.video-text"),
	}[promoType];

	const ANSImage = getImageFromANS(element);

	const imageParams = ANSImage
		? {
				ansImage: ANSImage,
				aspectRatio: imageRatioMD,
				resizedOptions: {
					smart: true,
				},
				responsiveImages: [400, 600, 800, 1200],
				width: 800,
		  }
		: {
				src: fallbackImage,
		  };

	return showHeadlineMD || showImageMD || showDescriptionMD || showBylineMD || showDateMD ? (
		<HeadingSection>
			<article
				className={`${BLOCK_CLASS_NAME}${showImageMD ? ` ${BLOCK_CLASS_NAME}--show-image` : ""}`}
			>
				{showImageMD ? (
					<MediaItem>
						<Conditional
							component={Link}
							condition={contentUrl}
							href={formatURL(contentUrl)}
							assistiveHidden
						>
							<Image {...imageParams} />
							{labelIconName ? (
								<div className={`${BLOCK_CLASS_NAME}__icon_label`}>
									<Icon name={labelIconName} />
									<span className={`${BLOCK_CLASS_NAME}__label`}>{labelIconText}</span>
								</div>
							) : null}
						</Conditional>
					</MediaItem>
				) : null}

				{contentHeading ? (
					<Heading>
						<Conditional component={Link} condition={contentUrl} href={formatURL(contentUrl)}>
							{contentHeading}
						</Conditional>
					</Heading>
				) : null}

				{contentDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
				{hasAuthors || showDateMD ? (
					<Attribution>
						<Join separator={Separator}>
							{hasAuthors ? (
								<Join separator={() => " "}>
									{phrases.t("global.by-text")}
									{formatAuthors(element?.credits?.by, phrases.t("global.and-text"))}
								</Join>
							) : null}
							{showDateMD ? (
								<DateComponent dateTime={contentDate} dateString={formattedDate} />
							) : null}
						</Join>
					</Attribution>
				) : null}
				{showBottomBorder ? <Divider /> : null}
			</article>
		</HeadingSection>
	) : null;
};

export default Medium;
