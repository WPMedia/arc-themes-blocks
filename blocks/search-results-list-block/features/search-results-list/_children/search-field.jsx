import React from "react";

import { Button, Icon, Input, Paragraph, Stack, usePhrases } from "@wpmedia/arc-themes-components";

const SearchField = ({ className, results, onChange, onSearch, searchTerm, totalItems }) => {
	// const { placeholderResizedImageOptions } = this.state;

	const phrases = usePhrases();

	return (
		<Stack className={className}>
			<Stack className={className} direction="vertical">
				<Icon name="Search" />
				<Input
					type="text"
					placeholder={phrases.t("search-results-blocks.search-input-placeholder")}
					className="search-bar"
					name="searchQuery"
					onChange={onChange}
				/>
				<Button
					aria-label={phrases.t("search-results-block.search-button")}
					onClick={() => onSearch(false)}
					size="small"
					variant="primary"
				>
					{phrases.t("search-results-block.search-button")}
				</Button>
			</Stack>
			{results && (
				<Paragraph className="search-results-text">
					{phrases.t("search-results-block.search-result-number", {
						smart_count: totalItems,
						searchTerm,
					})}
				</Paragraph>
			)}
		</Stack>
	);
};

export default SearchField;
