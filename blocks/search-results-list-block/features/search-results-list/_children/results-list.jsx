import React from "react";

import { Button, Divider, Join, Stack, usePhrases } from "@wpmedia/arc-themes-components";
import SearchResult from "./search-result";

const ResultsList = ({ arcSite, className, results, onSearch, promoElements, totalItems }) => {
	const phrases = usePhrases();

	return results?.length > 0 ? (
		<Stack className={className}>
			<Join separator={Divider}>
				{results.map((content) => (
					<SearchResult
						arcSite={arcSite}
						className={`${className}-item`}
						content={content}
						key={`result-card-${content._id}`}
						promoElements={promoElements}
					/>
				))}
				{results.length < totalItems && (
					<Button
						accessibilityLabel={phrases.t("search-results-block.see-more-button-aria-label")}
						onClick={onSearch}
						size="small"
						variant="primary"
					>
						{phrases.t("search-results-block.see-more-button")}
					</Button>
				)}
			</Join>
		</Stack>
	) : null;
};

export default ResultsList;
