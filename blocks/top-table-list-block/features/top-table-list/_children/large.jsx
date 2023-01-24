import React from "react";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";

import { localizeDateTime } from "@wpmedia/engine-theme-sdk";
import {
	Conditional,
	Grid,
	HeadingSection,
	Icon,
	Image,
	Join,
	Link,
	MediaItem,
	Stack,
	formatURL,
	getImageFromANS,
	getVideoFromANS,
	Overline,
	Heading,
	Paragraph,
	Date as DateDisplay,
	formatAuthors,
	Attribution,
	Separator,
	usePhrases,
	Video,
	Divider,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-top-table-list-large";

const getType = (type, content) => (content?.type === type ? content : undefined);

const Large = (props) => {
	const {
		element,
		customFields: {
			showBylineLG,
			showDateLG,
			showDescriptionLG,
			showHeadlineLG,
			showImageLG,
			showOverlineLG,
			playVideoInPlaceLG,
			showBottomBorderLG,
			imageRatioLG = "3:2",
		},
		fallbackImage,
	} = props;
	const { arcSite } = useFusionContext();

	const showBottomBorder = typeof showBottomBorderLG === "undefined" ? true : showBottomBorderLG;

	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "%B %d, %Y at %l:%M%p %Z",
		},
	} = getProperties(arcSite);

	const displayDate = localizeDateTime(
		new Date(element?.display_date),
		dateTimeFormat,
		language,
		timeZone
	);
	const phrases = usePhrases();

	const videoOrGalleryContent =
		getType("video", element) ||
		getType("gallery", element) ||
		getType("video", element?.promo_items?.lead_art) ||
		getType("gallery", element?.promo_items?.lead_art);

	const labelIconName = {
		gallery: "Camera",
		video: "Play",
	}[videoOrGalleryContent?.type];

	const labelIconText = {
		gallery: phrases.t("global.gallery-text"),
		video: phrases.t("global.video-text"),
	}[videoOrGalleryContent?.type];

	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (element?.label && element?.label?.basic) || {};

	const { _id: sectionUrl, name: sectionText } =
		element?.websites?.[arcSite]?.website_section || {};

	let [overlineText, overlineURL] = [sectionText, sectionUrl];
	if (element?.owner?.sponsored) {
		overlineText = element?.label?.basic?.text || phrases.t("global.sponsored-content");
		overlineURL = null;
	} else if (labelDisplay) {
		[overlineText, overlineURL] = [labelText, labelUrl];
	}

	const contentAuthors =
		showBylineLG && element?.credits?.by?.length > 0
			? formatAuthors(element.credits.by, phrases.t("global.and-text"))
			: null;
	const contentDate = showDateLG ? element?.display_date : null;
	const contentDescription = showDescriptionLG ? element?.description?.basic : null;
	const contentHeading = showHeadlineLG ? element?.headlines?.basic : null;
	const contentOverline = showOverlineLG ? overlineText : null;
	const contentUrl = element?.websites?.[arcSite]?.website_url;
	const embedMarkup = playVideoInPlaceLG && getVideoFromANS(element);
	const promoImageURL = showImageLG && (getImageFromANS(element)?.url || fallbackImage);

	const imageParams =
		element && getImageFromANS(element)
			? {
					ansImage: getImageFromANS(element),
					alt: element?.headlines?.basic || "",
					aspectRatio: imageRatioLG,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [400, 600, 800, 1200],
					width: 800,
			  }
			: {
					src: fallbackImage,
			  };

	return embedMarkup ||
		contentOverline ||
		contentHeading ||
		contentDescription ||
		contentAuthors ||
		contentDate ||
		promoImageURL ? (
		<HeadingSection>
			<Grid as="article" className={BLOCK_CLASS_NAME}>
				{embedMarkup || promoImageURL ? (
					<MediaItem>
						<Conditional
							component={Link}
							condition={embedMarkup ? false : contentUrl}
							href={formatURL(contentUrl)}
							assistiveHidden
						>
							{embedMarkup ? (
								<Video
									embedMarkup={embedMarkup}
									aspectRatio={imageRatioLG}
									viewportPercentage={65}
								/>
							) : (
								<>
									<Image {...imageParams} />
									{labelIconName ? (
										<div className={`${BLOCK_CLASS_NAME}__icon_label`}>
											<Icon name={labelIconName} />
											<span className={`${BLOCK_CLASS_NAME}__label`}>{labelIconText}</span>
										</div>
									) : null}
								</>
							)}
						</Conditional>
					</MediaItem>
				) : null}
				{contentOverline ||
				contentHeading ||
				contentDescription ||
				contentAuthors ||
				contentDate ? (
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						{contentOverline ? <Overline href={overlineURL}>{contentOverline}</Overline> : null}
						{contentHeading || contentDescription || contentAuthors || contentDate ? (
							<Stack>
								{contentHeading ? (
									<Heading>
										<Conditional
											component={Link}
											condition={contentUrl}
											href={formatURL(contentUrl)}
										>
											{contentHeading}
										</Conditional>
									</Heading>
								) : null}
								{contentDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
								{contentAuthors || contentDate ? (
									<Attribution>
										<Join separator={Separator}>
											{contentAuthors ? (
												<Join separator={() => " "}>
													{phrases.t("global.by-text")}
													{contentAuthors}
												</Join>
											) : null}
											{contentDate ? (
												<DateDisplay dateTime={contentDate} dateString={displayDate} />
											) : null}
										</Join>
									</Attribution>
								) : null}
							</Stack>
						) : null}
					</Stack>
				) : null}
			</Grid>
			{showBottomBorder ? <Divider /> : null}
		</HeadingSection>
	) : null;
};

export default Large;
