import React from "react";

import { Button, Icon, Input, Paragraph, Stack, usePhrases } from "@wpmedia/arc-themes-components";

const SearchField = ({
	className,
	defaultValue,
	results,
	onChange,
	onSearch,
	searchTerm,
	totalItems,
}) => {
	// const { placeholderResizedImageOptions } = this.state;

	const phrases = usePhrases();

	return (
		<Stack className={className}>
			<Stack className={className} direction="vertical">
				<Icon name="Search" />
				<Input
					className="search-bar"
					{...(defaultValue ? { defaultValue } : {})}
					name="searchQuery"
					onChange={onChange}
					placeholder={phrases.t("search-results-blocks.search-input-placeholder")}
					type="text"
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
