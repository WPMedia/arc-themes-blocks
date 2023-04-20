import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import {
	Attribution,
	Conditional,
	Date as DateComponent,
	Divider,
	formatAuthors,
	getImageFromANS,
	getVideoFromANS,
	Heading,
	HeadingSection,
	Image,
	Join,
	Link,
	localizeDateTime,
	MediaItem,
	Overline,
	Paragraph,
	Separator,
	Stack,
	usePhrases,
	Video,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-top-table-list-xl";

const ExtraLarge = (props) => {
	const {
		element,
		customFields: {
			imageRatioXL = "3:2",
			playVideoInPlaceXL,
			showBottomBorderXL,
			showBylineXL,
			showDateXL,
			showDescriptionXL,
			showHeadlineXL,
			showImageXL,
			showOverlineXL,
		},
		fallbackImage,
	} = props;
	const { arcSite } = useFusionContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "%B %d, %Y at %l:%M%p %Z",
		},
	} = getProperties(arcSite);
	const phrases = usePhrases();

	const showBottomBorder = typeof showBottomBorderXL === "undefined" || showBottomBorderXL;

	const displayDate = element?.display_date;
	const formattedDate = Date.parse(displayDate)
		? localizeDateTime(new Date(displayDate), dateTimeFormat, language, timeZone)
		: "";
	const hasDate = showDateXL && formattedDate;

	const { display: labelDisplay, url: labelUrl, text: labelText } = element?.label?.basic || {};

	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		element?.websites?.[arcSite]?.website_section || {};

	// Default to websites object data
	let [overlineText, overlineUrl] = [sectionText, sectionUrl];

	if (element?.owner?.sponsored) {
		overlineText = element?.label?.basic?.text || phrases.t("global.sponsored-content");
		overlineUrl = null;
	} else if (shouldUseLabel) {
		[overlineText, overlineUrl] = [labelText, labelUrl];
	}

	const hasOverline = showOverlineXL && overlineText;

	const contentDescription = showDescriptionXL ? element?.description?.basic : null;
	const contentHeading = showHeadlineXL ? element?.headlines?.basic : null;
	const contentUrl = element?.websites?.[arcSite]?.website_url;
	const embedMarkup = playVideoInPlaceXL && getVideoFromANS(element);
	const hasAuthors = showBylineXL && element?.credits?.by.length > 0;
	const imageParams =
		element && getImageFromANS(element)
			? {
					ansImage: getImageFromANS(element),
					alt: element?.headlines?.basic || "",
					aspectRatio: imageRatioXL,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [400, 600, 800, 1200],
					width: 800,
			  }
			: {
					src: fallbackImage,
			  };

	return hasOverline ||
		contentHeading ||
		showImageXL ||
		contentDescription ||
		hasAuthors ||
		hasDate ? (
		<>
			<article className={BLOCK_CLASS_NAME}>
				{hasOverline ? <Overline href={overlineUrl}>{overlineText}</Overline> : null}
				{contentHeading || showImageXL || contentDescription || hasAuthors || hasDate ? (
					<Stack>
						{contentHeading ? (
							<HeadingSection>
								<Heading>
									<Conditional component={Link} condition={contentUrl} href={contentUrl}>
										{contentHeading}
									</Conditional>
								</Heading>
							</HeadingSection>
						) : null}
						{embedMarkup || showImageXL ? (
							<MediaItem>
								{embedMarkup ? (
									<Video embedMarkup={embedMarkup} aspectRatio={imageRatioXL} />
								) : (
									<Conditional
										component={Link}
										condition={contentUrl}
										href={contentUrl}
										assistiveHidden
									>
										<Image {...imageParams} />
									</Conditional>
								)}
							</MediaItem>
						) : null}
						{contentDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
						{hasAuthors || hasDate ? (
							<Attribution>
								<Join separator={Separator}>
									{hasAuthors ? (
										<Join separator={() => " "}>
											{phrases.t("global.by-text")}
											{formatAuthors(element?.credits?.by, phrases.t("global.and-text"))}
										</Join>
									) : null}
									{hasDate ? (
										<DateComponent dateTime={displayDate} dateString={formattedDate} />
									) : null}
								</Join>
							</Attribution>
						) : null}
					</Stack>
				) : null}
			</article>

			{showBottomBorder ? <Divider /> : null}
		</>
	) : null;
};

export default ExtraLarge;
