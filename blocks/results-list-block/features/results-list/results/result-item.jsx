import React from "react";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import {
	Stack,
	Separator,
	Heading,
	Overline,
	Image,
	Link,
	Date,
	formatAuthors,
	Paragraph,
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
			const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");
			/* Author Formatting */
			const bylineNodes = formatAuthors(credits?.by, phrases.t("global.and-text"));
			const imageURL = extractImageFromStory(element);
			const url = websites[arcSite].website_url;
			return (
				<Stack ref={ref} direction="horizontal" className={BLOCK_CLASS_NAME}>
					<Stack className={`${BLOCK_CLASS_NAME}__leftContent`}>
						{showItemOverline || showHeadline ? (
							<Stack>
								{showItemOverline ? <Overline href={overlineURL}>{overline}</Overline> : null}
								{showHeadline ? (
									<Link href={url}>
										<Heading>{headlineText}</Heading>
									</Link>
								) : null}
							</Stack>
						) : null}
						{showDescription || showDate || showByline ? (
							<Stack>
								{showDescription && descriptionText ? (
									<Link href={url}>
										<Paragraph>{descriptionText}</Paragraph>
									</Link>
								) : null}
								{showDate || showByline ? (
									<Stack direction="horizontal" className={`${BLOCK_CLASS_NAME}__author`}>
										{showByline ? (
											<>
												<span>{bylineNodes}</span>
												{showDate ? <Separator /> : null}
											</>
										) : null}
										{showDate ? <Date dateString={displayDate} dateTime={displayDate} /> : null}
									</Stack>
								) : null}
							</Stack>
						) : null}
					</Stack>
					{showImage ? (
						<Stack>
							<Link href={url} assistiveHidden>
								<Image
									{...imageProperties}
									src={imageURL !== null ? imageURL : targetFallbackImage}
									alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
									resizedOptions={
										imageURL !== null
											? extractResizedParams(element)
											: placeholderResizedImageOptions
									}
								/>
							</Link>
						</Stack>
					) : null}
				</Stack>
			);
		}
	)
);

export default ResultItem;
