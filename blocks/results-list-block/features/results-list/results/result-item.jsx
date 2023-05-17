import React from "react";
import { useEditableContent } from "fusion:content";
import { useComponentContext } from "fusion:context";
import getProperties from "fusion:properties";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";

import {
	Attribution,
	Conditional,
	Date as DateComponent,
	formatAuthors,
	formatURL,
	getImageFromANS,
	Heading,
	Image,
	imageANSToImageSrc,
	Join,
	Link,
	localizeDateTime,
	MediaItem,
	Overline,
	Paragraph,
	Separator,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-results-list";

const ResultItem = React.memo(
	React.forwardRef(
		(
			{
				arcSite,
				element,
				targetFallbackImage,
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
				credits,
			} = element;
			const phrases = usePhrases();
			const { registerSuccessEvent } = useComponentContext();
			const {
				dateLocalization: { language, timeZone, dateTimeFormat } = {
					language: "en",
					timeZone: "GMT",
					dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
				},
				resizerURL,
			} = getProperties(arcSite);

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

			/* Author Formatting */
			const imageURL = imageANSToImageSrc(getImageFromANS(element)) || null;
			const auth = getImageFromANS(element)?.auth || {};
			const { searchableField } = useEditableContent();
			const hasSomeAuthorName = credits?.by.some((author) => author.name && author?.name !== "");
			const hasAuthors = showByline ? credits?.by && credits?.by.length && hasSomeAuthorName : null;
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
									src={imageURL !== null ? imageURL : targetFallbackImage}
									alt={headlineText}
									resizedOptions={{ auth: auth[RESIZER_TOKEN_VERSION], smart: true }}
									resizerURL={resizerURL}
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
									width={500}
									height={333}
								/>
							</Conditional>
						</MediaItem>
					) : null}
					{showItemOverline && overlineText ? (
						<Overline href={overlineURL}>{overlineText}</Overline>
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
									<>
										{phrases.t("global.by-text")}&nbsp;
										{formatAuthors(credits?.by, phrases.t("global.and-text"))}
									</>
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
