import React from "react";

import { Button, Divider, Join, Stack, usePhrases } from "@wpmedia/arc-themes-components";
import SearchResult from "./search-result";

const ResultsList = ({ arcSite, className, content, onSearch, promoElements, totalItems }) => {
	const phrases = usePhrases();

	return content?.length > 0 ? (
		<Stack className={className}>
			<Join separator={Divider}>
				{content.map((contentItem) => (
					<SearchResult
						arcSite={arcSite}
						className={`${className}-item`}
						content={contentItem}
						key={`result-card-${contentItem._id}`}
						promoElements={promoElements}
					/>
				))}
				{content.length < totalItems && (
					<Button
						accessibilityLabel={phrases.t("search-results-block.see-more-button-aria-label")}
						onClick={onSearch}
						size="medium"
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
