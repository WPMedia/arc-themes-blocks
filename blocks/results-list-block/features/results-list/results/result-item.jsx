import React from "react";
import { useEditableContent } from "fusion:content";
import { useComponentContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { localizeDateTime } from "@wpmedia/engine-theme-sdk";

import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import {
	Attribution,
	Separator,
	Heading,
	Overline,
	Image,
	Link,
	Date as DateComponent,
	formatAuthors,
	Paragraph,
	Join,
	formatURL,
	MediaItem,
	Conditional,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-result-list";

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
				overline,
				overlineURL,
			},
			ref
		) => {
			const {
				description: { basic: descriptionText } = {},
				display_date: displayDate,
				headlines: { basic: headlineText } = {},
				websites,
				credits,
			} = element;
			const {
				dateLocalization: { language, timeZone, dateTimeFormat } = {
					language: "en",
					timeZone: "GMT",
					dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
				},
			} = getProperties(arcSite);
			const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");
			const { registerSuccessEvent } = useComponentContext();

			/* Author Formatting */
			const imageURL = extractImageFromStory(element);
			const { searchableField } = useEditableContent();
			const hasAuthors = showByline ? credits?.by && credits?.by.length : null;
			const contentHeading = showHeadline ? headlineText : null;
			const formattedDate = Date.parse(displayDate)
				? localizeDateTime(new Date(displayDate), dateTimeFormat, language, timeZone)
				: "";
			const url = websites[arcSite].website_url;
			return showHeadline ||
				showImage ||
				showDescription ||
				showByline ||
				showDate ||
				showItemOverline ? (
				<div
					ref={ref}
					className={`${BLOCK_CLASS_NAME}${showImage ? ` ${BLOCK_CLASS_NAME}--show-image` : ""}`}
				>
					{showImage ? (
						<MediaItem {...searchableField("imageOverrideURL")} suppressContentEditableWarning>
							<Conditional
								component={Link}
								condition={url}
								href={formatURL(url)}
								onClick={registerSuccessEvent}
								assistiveHidden
							>
								<Image
									{...imageProperties}
									src={imageURL !== null ? imageURL : targetFallbackImage}
									alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
									resizedOptions={
										imageURL !== null
											? extractResizedParams(element)
											: placeholderResizedImageOptions
									}
									sizes={[
										{
											isDefault: true,
											sourceSizeValue: "100px",
										},
										{
											sourceSizeValue: "500px",
											mediaCondition: "(min-width: 48rem)",
										},
									]}
									responsiveImages={[100, 500]}
								/>
							</Conditional>
						</MediaItem>
					) : null}
					{showItemOverline ? (
						<div>
							<Overline href={overlineURL}>{overline}</Overline>
						</div>
					) : null}
					{contentHeading ? (
						<Heading>
							<Conditional
								component={Link}
								condition={url}
								href={formatURL(url)}
								onClick={registerSuccessEvent}
							>
								{headlineText}
							</Conditional>
						</Heading>
					) : null}
					{showDescription && descriptionText ? (
						<Link href={url}>
							<Paragraph>{descriptionText}</Paragraph>
						</Link>
					) : null}
					{showDate || hasAuthors ? (
						<Attribution>
							<Join separator={Separator}>
								{hasAuthors ? (
									<Join separator={() => " "}>
										{phrases.t("global.by-text")}
										{formatAuthors(credits?.by, phrases.t("global.and-text"))}
									</Join>
								) : null}
								{showDate ? (
									<DateComponent dateTime={displayDate} dateString={formattedDate} />
								) : null}
							</Join>
						</Attribution>
					) : null}
				</div>
			) : null;
		}
	)
);

export default ResultItem;
