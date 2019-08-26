import React from 'react';
import unescapeHtml from '../../../../_shared/arc/unescape-html';

const Table = ({ element }) => {
  const { header, rows } = element;

  const tableHeaders = header.map(headerItem => (
    <th
      key={headerItem._id}
      dangerouslySetInnerHTML={{ __html: unescapeHtml(headerItem.content) }}
    />
  ));

  const tableRows = rows.map((row) => {
    const cells = row.map(item => (
      <td
        key={item._id}
        dangerouslySetInnerHTML={{ __html: unescapeHtml(item.content) }}
      />
    ));
    return <tr>{cells}</tr>;
  });


  return (
    <table>
      <tr>{tableHeaders}</tr>
      {tableRows}
    </table>
  );
};

export default Table;
