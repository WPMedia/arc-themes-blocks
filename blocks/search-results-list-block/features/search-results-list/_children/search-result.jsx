import React from "react";
import getProperties from "fusion:properties";

import {
	Attribution,
	Conditional,
	Date as DateComponent,
	formatAuthors,
	formatURL,
	getImageFromANS,
	Heading,
	HeadingSection,
	Image,
	Join,
	Link,
	MediaItem,
	Paragraph,
	Separator,
	usePhrases,
} from "@wpmedia/arc-themes-components";

import { localizeDateTime } from "@wpmedia/engine-theme-sdk";

const SearchResult = ({ arcSite, className, content, promoElements }) => {
	const phrases = usePhrases();

	if (!content?.websites?.[arcSite]) {
		return null;
	}

	const { showHeadline, showImage, showDescription, showByline, showDate } = promoElements;
	const {
		dateLocalization: { dateTimeFormat, language, timeZone } = {
			dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
			language: "en",
			timeZone: "GMT",
		},
		fallbackImage,
	} = getProperties(arcSite);

	const contentDescription = showDescription ? content?.description?.basic : null;
	const contentHeading = showHeadline ? content?.headlines?.basic : null;
	const contentUrl = content?.websites?.[arcSite]?.website_url;
	const hasAuthors = showByline ? content?.credits?.by?.length : null;

	const ansImage = getImageFromANS(content);
	const imageParams =
		content && ansImage
			? {
					ansImage,
					resizedOptions: {
						smart: true,
					},
					responsiveImages: [200, 400, 800],
					sizes: [
						{
							isDefault: true,
							sourceSizeValue: "100px",
						},
						{
							sourceSizeValue: "500px",
							mediaCondition: "(min-width: 48rem)",
						},
					],
					width: 400,
			  }
			: {
					src: fallbackImage,
			  };

	const displayDate = content?.display_date;
	const formattedDate = Date.parse(displayDate)
		? localizeDateTime(new Date(displayDate), dateTimeFormat, language, timeZone)
		: "";

	return (
		<HeadingSection>
			<article className={`${className}${showImage ? ` ${className}--show-image` : ""}`}>
				{showImage ? (
					<MediaItem>
						<Conditional
							component={Link}
							condition={contentUrl}
							href={formatURL(contentUrl)}
							assistiveHidden
						>
							<Image {...imageParams} alt={contentHeading} />
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

				{showDescription ? <Paragraph>{contentDescription}</Paragraph> : null}
				{hasAuthors || showDate ? (
					<Attribution>
						<Join separator={Separator}>
							{hasAuthors ? (
								<Join separator={() => " "}>
									{phrases.t("global.by-text")}
									{formatAuthors(content?.credits?.by, phrases.t("global.and-text"))}
								</Join>
							) : null}
							{showDate ? (
								<DateComponent dateTime={displayDate} dateString={formattedDate} />
							) : null}
						</Join>
					</Attribution>
				) : null}
			</article>
		</HeadingSection>
	);
};

export default SearchResult;
