import React from 'react';
import styled from 'styled-components';
import unescapeHtml from '../shared/unescape-html';

const StyledOrdered = styled.li`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const StyledUnordered = styled.ul`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const List = (props) => {
  const { listType, listItems } = props;
  const list = listItems.map((listItem) => {
    if (listItem.type === 'list') {
      const { list_type: nestedListType, items: nestedListItems } = listItem;
      return <List key={listItem._id} listType={nestedListType} listItems={nestedListItems} />;
    }
    return (
      <StyledOrdered
        key={listItem._id}
        dangerouslySetInnerHTML={{ __html: unescapeHtml(listItem.content) }}
        primaryColor={props.primaryColor}
      />
    );
  });

  if (listType === 'unordered') {
    return (
      <StyledUnordered primaryColor={props.primaryColor}>
        {list}
      </StyledUnordered>
    );
  }

  return (
    <ol>
      {list}
    </ol>
  );
};

export default List;
