/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import Consumer from "fusion:consumer";

import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { SearchIcon } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Button, BUTTON_STYLES, BUTTON_TYPES, PrimaryFont } from "@wpmedia/shared-styles";
import SearchResult from "./search-result";

// shared with results list
// to modify, go to the shared styles block
import "@wpmedia/shared-styles/scss/_results-list.scss";

// not shared with results list
import "./search-results-list.scss";

@Consumer
class CustomSearchResultsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			storedList: {},
			resultList: {},
			value: props?.customFields?.searchContentConfig?.contentConfigValues?.query || "",
			page: 1,
			searchTerm: "",
			placeholderResizedImageOptions: {},
		};

		const {
			websiteDomain,
			fallbackImage,
			primaryLogoAlt,
			breakpoints,
			resizerURL,
			locale = "en",
		} = getProperties(props.arcSite) || {};

		this.phrases = getTranslatedPhrases(locale);
		this.websiteDomain = websiteDomain;
		this.fallbackImage = fallbackImage;

		this.imageProps = {
			smallWidth: 158,
			smallHeight: 89,
			mediumWidth: 274,
			mediumHeight: 154,
			largeWidth: 274,
			largeHeight: 154,
			primaryLogoAlt,
			breakpoints,
			resizerURL,
		};

		this.fetchPlaceholder();
		this.fetchStories();
	}

	getFallbackImageURL() {
		const { arcSite, deployment, contextPath } = this.props;
		let targetFallbackImage = getProperties(arcSite).fallbackImage;

		if (!targetFallbackImage.includes("http")) {
			targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
		}

		return targetFallbackImage;
	}

	fetchPlaceholder() {
		const targetFallbackImage = this.getFallbackImageURL();

		if (!targetFallbackImage.includes("/resources/")) {
			this.fetchContent({
				placeholderResizedImageOptions: {
					source: "resize-image-api",
					query: {
						raw_image_url: targetFallbackImage,
						respect_aspect_ratio: true,
					},
				},
			});
		}
	}

	fetchStories(additionalStoryAmount) {
		const {
			customFields: { searchContentConfig },
		} = this.props;
		const { value, storedList } = this.state;

		searchContentConfig.contentConfigValues.query = value;
		// If 'See More' button is pressed
		if (additionalStoryAmount) {
			this.state.page += 1;
			const { page } = this.state;
			searchContentConfig.contentConfigValues.page = page.toString();
			this.fetchContent({
				resultList: {
					source: searchContentConfig.contentService,
					query: searchContentConfig.contentConfigValues,
					transform(results) {
						if (results) {
							// Add new data to previous list
							const combinedData = storedList.data.concat(results.data);
							storedList.data = combinedData;
							storedList.metadata = results.metadata;
						}
						return storedList;
					},
				},
			});
		} else {
			this.state.page = 1;
			searchContentConfig.contentConfigValues.page = "1";
			this.fetchContent({
				resultList: {
					source: searchContentConfig.contentService,
					query: searchContentConfig.contentConfigValues,
					transform(results) {
						if (results) {
							// Initializes storedList
							storedList.data = results.data;
							storedList.metadata = results.metadata;
						}
						return results;
					},
				},
			});
		}
		this.state.searchTerm = value;
	}

	render() {
		const {
			resultList: { data, metadata: { total_hits: totalHits } = {} } = {},
			searchTerm,
			placeholderResizedImageOptions,
		} = this.state;
		const targetFallbackImage = this.getFallbackImageURL();
		const { arcSite } = this.props;
		const { promoElements } = this.props;

		return (
			<div>
				<div className="search-container">
					<div>
						<div className="search-icon-container">
							<SearchIcon fill="#979797" />
						</div>
						<PrimaryFont
							as="input"
							type="text"
							placeholder={this.phrases.t("search-results-blocks.search-input-placeholder")}
							className="search-bar"
							onChange={(evt) => this.setState({ value: evt.target.value })}
						/>
						<PrimaryFont
							as="button"
							type="button"
							className="btn btn-sm"
							backgroundColor="primary-color"
							onClick={() => this.fetchStories(false)}
						>
							{this.phrases.t("search-results-block.search-button")}
						</PrimaryFont>
					</div>
					{data && (
						<p className="search-results-text">
							{this.phrases.t("search-results-block.search-result-number", {
								smart_count: totalHits,
								searchTerm,
							})}
						</p>
					)}
				</div>
				<div className="results-list-container">
					{data &&
						data.length > 0 &&
						data.map((element) => {
							const resizedImageOptions = extractImageFromStory(element)
								? extractResizedParams(element)
								: placeholderResizedImageOptions;

							return (
								<SearchResult
									key={`result-card-${element._id}`}
									element={element}
									arcSite={arcSite}
									targetFallbackImage={targetFallbackImage}
									resizedImageOptions={resizedImageOptions}
									promoElements={promoElements}
									imageProps={this.imageProps}
								/>
							);
						})}
					{!!(data && data.length > 0 && data.length < totalHits) && (
						<div className="see-more">
							<Button
								ariaLabel={this.phrases.t("search-results-block.see-more-button-aria-label")}
								buttonStyle={BUTTON_STYLES.PRIMARY}
								buttonTypes={BUTTON_TYPES.LABEL_ONLY}
								text={this.phrases.t("search-results-block.see-more-button")}
								onClick={() => this.fetchStories(true)}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

CustomSearchResultsList.propTypes = {
	customFields: PropTypes.shape({
		searchContentConfig: PropTypes.contentConfig().tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
	}),
};

export default CustomSearchResultsList;
