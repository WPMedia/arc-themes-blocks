/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	getImageFromANS,
	Stack,
	isServerSide,
	Heading,
	HeadingSection,
	Image,
	Link,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-simple-list";

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
	let targetFallbackImage = fallbackImage;

	if (!targetFallbackImage.includes("http")) {
		targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
	}

	return targetFallbackImage;
};

const SimpleListWrapper = ({ customFields }) => {
	const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext();
	const { websiteDomain, fallbackImage, primaryLogoAlt } = getProperties(arcSite);

	const targetFallbackImage = getFallbackImageURL({
		deployment,
		contextPath,
		fallbackImage,
	});

	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
			<SimpleList
				id={id}
				customFields={customFields}
				targetFallbackImage={targetFallbackImage}
				websiteDomain={websiteDomain}
				arcSite={arcSite}
				primaryLogoAlt={primaryLogoAlt}
			/>
		</LazyLoad>
	);
};

const SimpleList = (props) => {
	const {
		arcSite,
		customFields: {
			listContentConfig: { contentService = "", contentConfigValues = {} } = {},
			title = "",
			showHeadline = true,
			showImage = true,
		} = {},
		id = "",
		targetFallbackImage,
	} = props;

	// need to inject the arc site here into use content
	const { content_elements: contentElements = [] } =
		useContent({
			source: contentService,
			query: { ...contentConfigValues, feature: "simple-list" },
			filter: `{
		content_elements {
			_id
			headlines {
				basic
			}
		  	website_url
		  	promo_items {
				basic {
					_id
					type
					url
					auth {
						${RESIZER_TOKEN_VERSION}
					}
			 	}
				lead_art {
					promo_items {
				  		basic {
							_id
							type
							url
							auth {
								${RESIZER_TOKEN_VERSION}
							}
						}
					}
					type
			 	}
		  	}
		  	websites {
				${arcSite} {
					website_url
				}
		  	}
		}
	 }`,
		}) || {};

	const Wrapper = title ? HeadingSection : React.Fragment;

	return (
		<HeadingSection>
			<Stack key={id} className={BLOCK_CLASS_NAME}>
				{title ? <Heading>{title}</Heading> : null}
				<Wrapper>
					<Stack className={`${BLOCK_CLASS_NAME}__items`} divider>
						{contentElements.map((element) => {
							const { headlines: { basic: headlineText = "" } = {}, websites } = element;
							const image = getImageFromANS(element);

							if (!websites[arcSite]) {
								return null;
							}
							const url = websites[arcSite].website_url;
							const imageParams = image
								? {
										ansImage: image,
										aspectRatio: "3:2",
										resizedOptions: {
											smart: true,
										},
										responsiveImages: [274, 548, 1096],
										width: 274,
								  }
								: {
										src: targetFallbackImage,
								  };

							return (
								<Stack
									as="article"
									className={`${BLOCK_CLASS_NAME}__item`}
									direction="horizontal"
									key={`simple-list-${element._id}`}
								>
									{showImage ? (
										<Link href={url} className={`${BLOCK_CLASS_NAME}__item-anchor`} assistiveHidden>
											<Image {...imageParams} />
										</Link>
									) : null}
									{showHeadline && headlineText !== "" ? (
										<Link href={url}>
											<Heading truncationLines={3}>{headlineText}</Heading>
										</Link>
									) : null}
								</Stack>
							);
						})}
					</Stack>
				</Wrapper>
			</Stack>
		</HeadingSection>
	);
};

SimpleListWrapper.propTypes = {
	customFields: PropTypes.shape({
		listContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		title: PropTypes.string.tag({ label: "Title" }),
		showHeadline: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showImage: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Show promo elements",
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

SimpleListWrapper.label = "Simple List – Arc Block";

SimpleListWrapper.icon = "arc-list";

export default SimpleListWrapper;
