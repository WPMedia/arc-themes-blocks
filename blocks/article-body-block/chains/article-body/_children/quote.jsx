import React from "react";

import { Paragraph, Stack } from "@wpmedia/arc-themes-components";
import List from "./list";

export default ({ type = "blockquote", classPrefix, element }) => {
	const { content_elements: contentElements = [], citation = {}, _id: elementId } = element;
	const className = classPrefix ? `${classPrefix}__${type}` : null;

	// Only allow text and list contentElement types
	const quoteItems = [];
	contentElements.forEach((contentItem) => {
		if (
			contentItem.type === "text" &&
			Object.prototype.hasOwnProperty.call(contentItem, "content")
		) {
			quoteItems.push(<Paragraph key={contentItem._id}>{contentItem.content}</Paragraph>);
		}
		if (contentItem.type === "list") {
			const { list_type: listType, items: listItems } = contentItem;
			quoteItems.push(<List key={contentItem._id} listType={listType} listItems={listItems} />);
		}
	});
	if (
		citation.type === "text" &&
		citation.content !== null &&
		citation.content !== undefined &&
		citation.content !== ""
	) {
		const citeClassName = classPrefix ? `${classPrefix}__citation` : null;
		quoteItems.push(
			// doesn't look like it has id
			// via https://github.com/washingtonpost/ans-schema/search?p=2&q=citation&unscoped_q=citation
			<span key={citation.content} className={citeClassName}>
				&mdash; &nbsp;
				{citation.content}
			</span>
		);
	}

	return (
		<Stack
			as="blockquote"
			key={elementId}
			className={className}
			cite={element.citation && element.citation.content}
		>
			{quoteItems}
		</Stack>
	);
};
