import React from "react";
import unescapeHtml from "../shared/unescape-html";

const Table = ({ element, classPrefix }) => {
	const { header, rows } = element;
	const className = classPrefix ? `${classPrefix}__table` : null;

	const tableHeaders = header.map((headerItem) => (
		// eslint-disable-next-line jsx-a11y/control-has-associated-label
		<th
			key={headerItem._id}
			dangerouslySetInnerHTML={{ __html: unescapeHtml(headerItem.content) }}
		/>
	));

	const tableRows = rows.map((row) => {
		let keys;
		const cells = row.map((item) => {
			keys += item._id;
			return <td key={item._id} dangerouslySetInnerHTML={{ __html: unescapeHtml(item.content) }} />;
		});
		return <tr key={keys}>{cells}</tr>;
	});

	return (
		<div className="table-wrapper">
			<table className={className}>
				<thead>
					<tr>{tableHeaders}</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
		</div>
	);
};

export default Table;
