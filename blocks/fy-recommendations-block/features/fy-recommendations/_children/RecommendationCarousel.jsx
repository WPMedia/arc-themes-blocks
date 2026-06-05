import React from "react";
import {
	Carousel,
	getImageFromANS,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Link,
	Paragraph,
	Stack,
	usePhrases,
} from "@wpmedia/arc-themes-components";
import { useFusionContext, useComponentContext } from "fusion:context";

const BLOCK_CLASS_NAME = "b-fy-recommendations";

// Forked from the Story Carousel block. Renders the ANS subset produced by the
// fy-recommendations content source as a compact horizontal carousel, at parity
// with the fy-ui-poc reference card (image, category, headline, author, premium
// ribbon). Missing fields degrade gracefully.
const RecommendationCarousel = ({ items = [] }) => {
	const { id } = useComponentContext();
	const { arcSite } = useFusionContext();
	const phrases = usePhrases();

	if (!items.length) return null;

	return (
		<Carousel
			id={id}
			label={phrases.t("fy-recommendations.aria-label")}
			nextButton={
				<Carousel.Button id={id} label={phrases.t("fy-recommendations.right-arrow-label")}>
					<Icon name="ChevronRight" />
				</Carousel.Button>
			}
			previousButton={
				<Carousel.Button id={id} label={phrases.t("fy-recommendations.left-arrow-label")}>
					<Icon name="ChevronLeft" />
				</Carousel.Button>
			}
		>
			{items.map((item, index) => {
				const headlineText = item?.headlines?.basic ?? null;
				const imageURL = getImageFromANS(item)?.url;
				const category = item?.taxonomy?.sections?.[0]?.name ?? null;
				const author = item?.credits?.by?.[0]?.name ?? null;
				const isPremium = Boolean(item?.label?.isPremium?.display);

				const websites = item?.websites ?? {};
				const url =
					websites[arcSite]?.website_url ?? Object.values(websites)[0]?.website_url ?? null;

				if (!url) return null;

				return (
					<Carousel.Item
						key={item._id || index}
						label={phrases.t("fy-recommendations.slide-indicator", {
							current: index + 1,
							maximum: items.length,
						})}
					>
						{({ viewable }) => (
							<Link
								className={`${BLOCK_CLASS_NAME}__card`}
								href={url}
								assistiveHidden={viewable ? null : true}
							>
								<Image alt={headlineText || ""} src={imageURL} />
								{isPremium ? (
									<Paragraph className={`${BLOCK_CLASS_NAME}__card-premium`}>
										{phrases.t("fy-recommendations.premium-label")}
									</Paragraph>
								) : null}
								<Stack className={`${BLOCK_CLASS_NAME}__card-body`}>
									{category ? (
										<Paragraph className={`${BLOCK_CLASS_NAME}__card-category`}>
											{category}
										</Paragraph>
									) : null}
									{headlineText ? (
										<HeadingSection>
											<Heading className={`${BLOCK_CLASS_NAME}__card-title`}>
												{headlineText}
											</Heading>
										</HeadingSection>
									) : null}
									{author ? (
										<Paragraph className={`${BLOCK_CLASS_NAME}__card-author`}>
											{author}
										</Paragraph>
									) : null}
								</Stack>
							</Link>
						)}
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};

export default RecommendationCarousel;
