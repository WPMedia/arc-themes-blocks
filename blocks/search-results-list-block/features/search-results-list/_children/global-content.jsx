/* istanbul ignore file */
import React from "react";
import Consumer from "fusion:consumer";

import { Stack } from "@wpmedia/arc-themes-components";

import SearchField from "./search-field";
import ResultsList from "./results-list";

const BLOCK_CLASS_NAME = "b-search-results-list";

// import "@wpmedia/shared-styles/scss/_results-list.scss";
// import "./search-results-list.scss";

@Consumer
class GlobalSearchResultsList extends React.Component {
	constructor(props) {
		super(props);
		this.arcSite = props.arcSite;
		const query = props?.globalContent?.metadata?.q;
		this.state = {
			storedList: {},
			resultList: {},
			page: 1,
			value: query || "",
			focusItem: 0,
		};

		this.customSearchAction = props.customSearchAction || null;
		this.listItemRefs = {};
	}

	componentDidUpdate(prevProps, prevState) {
		const prevFocusItem = prevState.focusItem;
		const { focusItem, resultList } = this.state;

		if (prevFocusItem === focusItem && prevFocusItem > 0) {
			const nextItem = resultList.data[focusItem];
			if (nextItem?._id) {
				this.listItemRefs[nextItem._id].querySelector("a:not([aria-hidden])").focus();
			}
		}
	}

	handleSearch() {
		const { value } = this.state;
		if (this.customSearchAction && value.length > 0) {
			this.customSearchAction(value);
		} else if (value.length > 0) {
			window.location.href = `/search/${value}`;
		}
	}

	fetchStories() {
		const { globalContent } = this.props;
		const { storedList, resultList, page } = this.state;
		let currentCount;
		// If 'See More' button is pressed for the first time
		if (page === 1) {
			// Set initial list from globalContent data
			storedList.data = globalContent.data;
			storedList.metadata = globalContent.metadata;
			// use storedList as index reference for focus
			currentCount = storedList?.data?.length;
		} else {
			currentCount = resultList?.data?.length;
		}
		// Get results from new page
		this.state.page += 1;
		this.fetchContent({
			resultList: {
				source: "search-api",
				query: {
					query: globalContent.metadata.q,
					// eslint-disable-next-line react/destructuring-assignment
					page: this.state.page.toString(),
				},
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
		this.setState({
			focusItem: currentCount,
		});
	}

	render() {
		const { resultList: { data, metadata: { total_hits: totalHits } = {} } = {}, searchTerm } =
			this.state;
		const { arcSite, promoElements } = this.props;

		return (
			<Stack className={BLOCK_CLASS_NAME}>
				<SearchField
					className={`${BLOCK_CLASS_NAME}__field`}
					results={data}
					onChange={(event) => this.setState({ value: event.target.value })}
					onSearch={() => this.handleSearch()}
					searchTerm={searchTerm}
					totalItems={totalHits}
				/>
				<ResultsList
					arcSite={arcSite}
					className={`${BLOCK_CLASS_NAME}__results`}
					results={data}
					onSearch={() => this.fetchStories()}
					promoElements={promoElements}
					totalItems={totalHits}
				/>
			</Stack>
		);
	}
}

export default GlobalSearchResultsList;
