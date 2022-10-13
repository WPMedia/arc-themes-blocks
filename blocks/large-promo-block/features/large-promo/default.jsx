import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";

import { LazyLoad, isServerSide, videoPlayerCustomFields } from "@wpmedia/engine-theme-sdk";
import { imageRatioCustomField } from "@wpmedia/resizer-image-block";
import { LargePromoPresentation } from "@wpmedia/shared-styles";

const LargePromoItem = ({ customFields, arcSite }) => {
	// todo: update to use new width specified for large size
	const content =
		useContent({
			source: customFields?.itemContentConfig?.contentService ?? null,
			query: customFields?.itemContentConfig?.contentConfigValues
				? {
						"arc-site": arcSite,
						feature: "large-promo",
						...customFields?.itemContentConfig?.contentConfigValues,
				  }
				: null,
			filter: `{
      _id
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
      description {
        basic
      }
      display_date
      type
      headlines {
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
        type
        url
        lead_art {
          embed_html
          type
          promo_items {
            basic {
              type
              url
              resized_params {
								600x450
								600x400
								600x338
								800x600
								800x533
								800x450
              }
            }
          }
        }
        basic {
          type
          url
          resized_params {
            600x450
            600x400
            600x338
            800x600
            800x533
						800x450
          }
        }
      }
      embed_html
      website_url
      websites {
        ${arcSite} {
          website_url
          website_section {
            _id
            name
          }
        }
      }
    }`,
		}) || null;
	console.log("large promo", content); // null then the client-side resizer

	return <LargePromoPresentation content={content} {...customFields} />;
};

const LargePromo = ({ customFields }) => {
	const { isAdmin, arcSite } = useFusionContext();
	const shouldLazyLoad = customFields?.lazyLoad && !isAdmin;
	if (shouldLazyLoad && isServerSide()) {
		return null;
	}
	return (
		<LazyLoad enabled={shouldLazyLoad}>
			<LargePromoItem customFields={customFields} arcSite={arcSite} />
		</LazyLoad>
	);
};

LargePromo.propTypes = {
	customFields: PropTypes.shape({
		itemContentConfig: PropTypes.contentConfig("ans-item").tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		showOverline: PropTypes.bool.tag({
			label: "Show overline",
			defaultValue: true,
			group: "Show promo elements",
		}),
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
		showDescription: PropTypes.bool.tag({
			label: "Show description",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showByline: PropTypes.bool.tag({
			label: "Show byline",
			defaultValue: true,
			group: "Show promo elements",
		}),
		showDate: PropTypes.bool.tag({
			label: "Show date",
			defaultValue: true,
			group: "Show promo elements",
		}),
		imageOverrideURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Image",
			searchable: "image",
		}),
		...imageRatioCustomField("imageRatio", "Art", "4:3"),
		playVideoInPlace: PropTypes.bool.tag({
			label: "Play video in place",
			group: "Art",
			defaultValue: false,
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
		...videoPlayerCustomFields(),
	}),
};

LargePromo.label = "Large Promo – Arc Block";

LargePromo.icon = "paragraph-bullets";

export default LargePromo;
