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
	const phrases = usePhrases();

	return (
		<Stack className={className}>
			<Stack className={`${className}-wrapper`} direction="horizontal">
				<Icon name="Search" />
				<Input
					{...(defaultValue ? { defaultValue } : {})}
					label=""
					name="searchQuery"
					onChange={onChange}
					placeholder={phrases.t("search-results-blocks.search-input-placeholder")}
					type="text"
				/>
				<Button
					accessibilityLabel={phrases.t("search-results-block.search-button")}
					onClick={() => onSearch(false)}
					size="large"
					variant="primary"
				>
					{phrases.t("search-results-block.search-button")}
				</Button>
			</Stack>
			{showResultsStats ? (
				<Paragraph>
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
