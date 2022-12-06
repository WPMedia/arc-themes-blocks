import React from "react";

import { Button, Icon, Input, Paragraph, Stack, usePhrases } from "@wpmedia/arc-themes-components";

const SearchField = ({
	className,
	defaultValue,
	onChange,
	onSearch,
	searchTerm,
	showResultsStats,
	totalItems,
}) => {
	// const { placeholderResizedImageOptions } = this.state;

	const phrases = usePhrases();

	return (
		<Stack className={className}>
			<Stack className={className} direction="row">
				<Icon name="Search" className={`${className}-search-icon`} />
				<Input
					className={`${className}-search-bar`}
					{...(defaultValue ? { defaultValue } : {})}
					name="searchQuery"
					onChange={onChange}
					placeholder={phrases.t("search-results-blocks.search-input-placeholder")}
					type="text"
				/>
				<Button
					accessibilityLabel={phrases.t("search-results-block.search-button")}
					onClick={() => onSearch(false)}
					size="small"
					variant="primary"
				>
					{phrases.t("search-results-block.search-button")}
				</Button>
			</Stack>
			{showResultsStats ? (
				<Paragraph className={`${className}-result-text`}>
					{phrases.t("search-results-block.search-result-number", {
						smart_count: totalItems,
						searchTerm,
					})}
				</Paragraph>
			) : null}
		</Stack>
	);
};

export default SearchField;
