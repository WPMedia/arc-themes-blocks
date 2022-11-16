/* eslint-disable camelcase */
import React from "react";
import PropTypes from "@arc-fusion/prop-types";

import { RESIZER_APP_VERSION } from "fusion:environment";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import getProperties from "fusion:properties";
import { Grid } from "@wpmedia/arc-themes-components";
import imageRatioCustomField from "./shared/imageRatioCustomField";
import { EXTRA_LARGE, LARGE, MEDIUM, SMALL } from "./shared/storySizeConstants";

import Small from "./_children/small";
import Medium from "./_children/medium";
import Large from "./_children/large";
import ExtraLarge from "./_children/extra-large";

const BLOCK_CLASS_NAME = "b-top-table-list";

const unserializeStory = () => (storyObject) => ({
	id: storyObject._id,
	element: storyObject,
});

const generateLabelString = (size) => `Number of ${size} Stories`;

export const TopTableList = ({ content, customFields, fallbackImage, offsetOverride, arcSite }) => {
	const { extraLarge = 0, large = 0, medium = 0, small = 0, storiesPerRowSM = 2 } = customFields;

	const storyTypeArray = [
		...new Array(extraLarge).fill(EXTRA_LARGE),
		...new Array(large).fill(LARGE),
		...new Array(medium).fill(MEDIUM),
		...new Array(small).fill(SMALL),
	];

	const siteContent = content.reduce((acc, element, index) => {
		if (element.websites?.[arcSite] && index >= offsetOverride) {
			return acc.concat(element);
		}
		return acc;
	}, []);

	const storyTypes = [...new Set(storyTypeArray)];
	const storyList = siteContent.map(unserializeStory());
	const storySizes = {
		EXTRA_LARGE: ExtraLarge,
		LARGE: Large,
		MEDIUM: Medium,
		SMALL: Small,
	};
	const storyTypeMap = {};

	if (storyList && storyTypeArray) {
		storyTypeArray.forEach((sType, index) => {
			if (index < storyList.length) {
				if (!storyTypeMap[sType]) storyTypeMap[sType] = [];
				storyTypeMap[sType].push(storyList[index]);
			}
		});
	}
	return (
		<Grid className={BLOCK_CLASS_NAME}>
			{storyTypes.map((storyType) => (
				<Grid
					key={storyType}
					className={`b-top-table-list-${storyType.toLowerCase()}-container`}
					style={
						storyType === SMALL
							? {
									"--c-grid-template-columns": `repeat(${storiesPerRowSM}, minmax(5rem, 1fr))`,
							  }
							: null
					}
				>
					{!!storyTypeMap[storyType] &&
						storyTypeMap[storyType].map((itemObject = {}) => {
							const { id: itemId, element } = itemObject;
							const Item = storySizes[storyType];
							return (
								<Item
									key={itemId}
									element={element}
									customFields={customFields}
									fallbackImage={fallbackImage}
								/>
							);
						})}
				</Grid>
			))}
		</Grid>
	);
};

const TopTableListWrapper = ({ customFields }) => {
	const {
		listContentConfig: { contentService = "", contentConfigValues = {} } = {},
		offsetOverride = 0,
		storiesPerRowSM = 2,
		lazyLoad,
	} = customFields;

	const { arcSite, isAdmin } = useFusionContext();
	const { fallbackImage } = getProperties(arcSite);

	const { content_elements: contentElements = [] } =
		useContent({
			source: contentService,
			query: { ...contentConfigValues, feature: "top-table-list" },
			filter: `{
      content_elements {
        _id,
        type
        display_date
        credits {
          by {
            _id
            name
            url
            type
            additional_properties {
              original {
                byline
              }
            }
          }
        }
        headlines {
          basic
        }
        description {
          basic
        }
        label {
          basic {
            display
            url
            text
          }
        }
        owner {
          sponsored
        }
        promo_items {
          basic {
				_id
            type
            url
				auth {
					${RESIZER_APP_VERSION}
				}
          }
          lead_art {
				_id
            type
            embed_html
            promo_items {
              basic {
					 _id
                type
                url
					 auth {
						${RESIZER_APP_VERSION}
					}
              }
            }
          }
        }
        embed_html
        websites {
          ${arcSite} {
            website_url
            website_section {
              _id
              name
            }
          }
        }
      }
    }`,
		}) || {};

	if (contentElements.length === 0) {
		return null;
	}

	if (lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	return (
		<LazyLoad enabled={lazyLoad && !isAdmin}>
			<TopTableList
				content={contentElements}
				customFields={customFields}
				fallbackImage={fallbackImage}
				storiesPerRowSM={storiesPerRowSM}
				offsetOverride={offsetOverride}
				arcSite={arcSite}
			/>
		</LazyLoad>
	);
};

TopTableListWrapper.propTypes = {
	customFields: PropTypes.shape({
		listContentConfig: PropTypes.contentConfig("ans-feed").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		offsetOverride: PropTypes.number.tag({
			group: "Configure Content",
			label: "Offset Override",
			defaultValue: 0,
		}),
		extraLarge: PropTypes.number.tag({
			label: generateLabelString("Extra Large"),
			default: 0,
		}),
		large: PropTypes.number.tag({
			label: generateLabelString("Large"),
			default: 0,
		}),
		medium: PropTypes.number.tag({
			label: generateLabelString("Medium"),
			default: 0,
		}),
		small: PropTypes.number.tag({
			label: generateLabelString("Small"),
			default: 0,
		}),
		//---------------------------------------
		showOverlineXL: PropTypes.bool.tag({
			label: "Show overline",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		showHeadlineXL: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		showImageXL: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		showDescriptionXL: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		showBylineXL: PropTypes.bool.tag({
			label: "Show byline",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		showDateXL: PropTypes.bool.tag({
			label: "Show date",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		...imageRatioCustomField("imageRatioXL", "Extra Large story settings", "4:3"),
		playVideoInPlaceXL: PropTypes.bool.tag({
			label: "Play video in place",
			group: "Extra Large story settings",
			defaultValue: false,
		}),
		showBottomBorderXL: PropTypes.bool.tag({
			label: "Show bottom border",
			defaultValue: true,
			group: "Extra Large story settings",
		}),
		//---------------------------------------
		showOverlineLG: PropTypes.bool.tag({
			label: "Show overline",
			defaultValue: true,
			group: "Large story settings",
		}),
		showHeadlineLG: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Large story settings",
		}),
		showImageLG: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Large story settings",
		}),
		showDescriptionLG: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Large story settings",
		}),
		showBylineLG: PropTypes.bool.tag({
			label: "Show byline",
			defaultValue: true,
			group: "Large story settings",
		}),
		showDateLG: PropTypes.bool.tag({
			label: "Show date",
			defaultValue: true,
			group: "Large story settings",
		}),
		...imageRatioCustomField("imageRatioLG", "Large story settings", "4:3"),
		playVideoInPlaceLG: PropTypes.bool.tag({
			label: "Play video in place",
			group: "Large story settings",
			defaultValue: false,
		}),
		showBottomBorderLG: PropTypes.bool.tag({
			label: "Show bottom border",
			defaultValue: true,
			group: "Large story settings",
		}),
		//---------------------------------------
		showHeadlineMD: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Medium story settings",
		}),
		showImageMD: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Medium story settings",
		}),
		showDescriptionMD: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Medium story settings",
		}),
		showBylineMD: PropTypes.bool.tag({
			label: "Show byline",
			defaultValue: true,
			group: "Medium story settings",
		}),
		showDateMD: PropTypes.bool.tag({
			label: "Show date",
			defaultValue: true,
			group: "Medium story settings",
		}),
		...imageRatioCustomField("imageRatioMD", "Medium story settings", "16:9"),
		showBottomBorderMD: PropTypes.bool.tag({
			label: "Show bottom border",
			defaultValue: true,
			group: "Medium story settings",
		}),
		//---------------------------------------
		showHeadlineSM: PropTypes.bool.tag({
			label: "Show headline",
			defaultValue: true,
			group: "Small story settings",
		}),
		showImageSM: PropTypes.bool.tag({
			label: "Show image",
			defaultValue: true,
			group: "Small story settings",
		}),
		...imageRatioCustomField("imageRatioSM", "Small story settings", "3:2"),
		storiesPerRowSM: PropTypes.oneOf([1, 2, 3, 4]).tag({
			name: "Stories per row",
			defaultValue: 2,
			group: "Small story settings",
		}),
		imagePositionSM: PropTypes.oneOf(["above", "below", "left", "right"]).tag({
			name: "Image position",
			defaultValue: "right",
			group: "Small story settings",
			labels: {
				above: "Image above",
				below: "Image below",
				left: "Image left",
				right: "Image right",
			},
			required: false,
			hidden: false,
		}),
		showBottomBorderSM: PropTypes.bool.tag({
			label: "Show bottom border",
			defaultValue: true,
			group: "Small story settings",
		}),
		//---------------------------------------
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

TopTableListWrapper.label = "Top Table List – Arc Block";

TopTableListWrapper.icon = "arc-list";

export default TopTableListWrapper;
