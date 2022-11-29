/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import Consumer from "fusion:consumer";

import { Stack } from "@wpmedia/arc-themes-components";

import SearchField from "./search-field";
import ResultsList from "./results-list";

const BLOCK_CLASS_NAME = "b-search-results-list";

// // shared with results list
// // to modify, go to the shared styles block
// import "@wpmedia/shared-styles/scss/_results-list.scss";

// // not shared with results list
// import "./search-results-list.scss";

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
		};

		this.fetchStories();
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
		const { resultList: { data, metadata: { total_hits: totalHits } = {} } = {}, searchTerm } =
			this.state;
		const { arcSite, promoElements } = this.props;

		return (
			<Stack className={BLOCK_CLASS_NAME}>
				<SearchField
					className={`${BLOCK_CLASS_NAME}__field`}
					onChange={(event) => this.setState({ value: event.target.value })}
					onSearch={() => this.fetchStories(false)}
					searchTerm={searchTerm}
					showResultsStats={data?.length > 0}
					totalItems={totalHits}
				/>
				<ResultsList
					arcSite={arcSite}
					className={`${BLOCK_CLASS_NAME}__results`}
					content={data}
					onSearch={() => this.fetchStories(true)}
					promoElements={promoElements}
					totalItems={totalHits}
				/>
			</Stack>
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
