import React from "react";

import { PrimaryFont, SecondaryFont } from "@wpmedia/shared-styles";
import List from "./list";

export default ({ element, className }) => {
	const { content_elements: contentElements = [], citation = {}, _id: elementId } = element;

	// Only allow text and list contentElement types
	const quoteItems = [];
	contentElements.forEach((contentItem) => {
		if (
			contentItem.type === "text" &&
			Object.prototype.hasOwnProperty.call(contentItem, "content")
		) {
			quoteItems.push(
				<SecondaryFont
					as="p"
					key={contentItem._id}
					dangerouslySetInnerHTML={{ __html: contentItem.content }}
				/>
			);
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
		quoteItems.push(
			// doesn't look like it has id
			// via https://github.com/washingtonpost/ans-schema/search?p=2&q=citation&unscoped_q=citation
			<PrimaryFont as="span" key={citation.content} className="citation-text">
				&mdash; &nbsp;
				{citation.content}
			</PrimaryFont>
		);
	}

	return (
		<blockquote
			key={elementId}
			className={className}
			cite={element.citation && element.citation.content}
		>
			{quoteItems}
		</blockquote>
	);
};
