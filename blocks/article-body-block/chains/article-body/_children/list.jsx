import React from "react";
import styled from "styled-components";
import unescapeHtml from "../shared/unescape-html";

const StyledListItem = styled.li`
	a {
		color: ${(props) => props.primaryColor};
	}
`;

const StyledOrderedList = styled.ol`
	a {
		color: ${(props) => props.primaryColor};
	}
`;

const StyledUnorderedList = styled.ul`
	a {
		color: ${(props) => props.primaryColor};
	}
`;

const List = (props) => {
	const { listType, listItems, primaryColor } = props;
	const list = listItems.map((listItem) => {
		if (listItem.type === "list") {
			const { list_type: nestedListType, items: nestedListItems } = listItem;
			return <List key={listItem._id} listType={nestedListType} listItems={nestedListItems} />;
		}
		return (
			<StyledListItem
				key={listItem._id}
				dangerouslySetInnerHTML={{ __html: unescapeHtml(listItem.content) }}
				primaryColor={primaryColor}
			/>
		);
	});

	if (listType === "unordered") {
		return <StyledUnorderedList primaryColor={primaryColor}>{list}</StyledUnorderedList>;
	}

	return <StyledOrderedList primaryColor={primaryColor}>{list}</StyledOrderedList>;
};

export default List;
