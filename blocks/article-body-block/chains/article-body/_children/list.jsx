import React from "react";
import unescapeHtml from "../shared/unescape-html";

const List = (props) => {
	const { listType, listItems } = props;
	const list = listItems.map((listItem) => {
		if (listItem.type === "list") {
			const { list_type: nestedListType, items: nestedListItems } = listItem;
			return <List key={listItem._id} listType={nestedListType} listItems={nestedListItems} />;
		}
		return (
			<li key={listItem._id} dangerouslySetInnerHTML={{ __html: unescapeHtml(listItem.content) }} />
		);
	});

	if (listType === "unordered") {
		return <ul>{list}</ul>;
	}

	return <ol>{list}</ol>;
};

export default List;
