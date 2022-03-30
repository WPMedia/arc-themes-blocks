import React from "react";
import PropTypes from "prop-types";
import { useAppContext, useFusionContext } from "fusion:context";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { HeadingSection } from "@wpmedia/shared-styles";
import CustomSearchResultsList from "./_children/custom-content";
import GlobalContentSearch from "./_children/global-content";
import { resolveDefaultPromoElements } from "./_children/helpers";

const SearchResultsListContainer = ({ customFields = {}, customSearchAction = null } = {}) => {
	const { arcSite } = useAppContext();
	const { isAdmin } = useFusionContext();
	const { inheritGlobalContent, lazyLoad = false } = customFields;
	let showGlobalContent;

	if (lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	if (typeof inheritGlobalContent === "undefined") {
		showGlobalContent = typeof searchContentConfig === "undefined";
	} else {
		showGlobalContent = inheritGlobalContent;
	}

	if (showGlobalContent) {
		return (
			<LazyLoad enabled={lazyLoad && !isAdmin}>
				<HeadingSection>
					<GlobalContentSearch
						arcSite={arcSite}
						customSearchAction={customSearchAction}
						promoElements={resolveDefaultPromoElements(customFields)}
					/>
				</HeadingSection>
			</LazyLoad>
		);
	}
	return (
		<LazyLoad enabled={lazyLoad && !isAdmin}>
			<HeadingSection>
				<CustomSearchResultsList
					arcSite={arcSite}
					promoElements={resolveDefaultPromoElements(customFields)}
				/>
			</HeadingSection>
		</LazyLoad>
	);
};

SearchResultsListContainer.label = "Search Results List – Arc Block";

SearchResultsListContainer.icon = "arc-list";

SearchResultsListContainer.propTypes = {
	customFields: PropTypes.shape({
		searchContentConfig: PropTypes.contentConfig().tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		inheritGlobalContent: PropTypes.bool.tag({
			group: "Configure Content",
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
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

export default SearchResultsListContainer;
