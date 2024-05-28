import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import Table from "./table";

describe("the article body Table component", () => {
	const tableData = {
		_id: "5RGNUWD3RBAOXG6DJKLZSTUM5Q",
		type: "table",
		header: [
			{
				type: "text",
				_id: "2TNNJMJ6XZCIPHPQJJTUZXHT5M",
				content: "Column 1",
			},
			{
				type: "text",
				_id: "TSJPMDNZHZF77JPFTYQM2Z2CCM",
				content: "Column 2",
			},
			{
				type: "text",
				_id: "DWLCAVKFYVCHBKM5XODBLYRDWI",
				content: "Column 3",
			},
			{
				type: "text",
				_id: "OACEBLQAAJEKNA47TXTC3FMCGE",
				content: "Column 4",
			},
		],
		additional_properties: {
			_id: "X3HS46FCIFGODICRNMVZ25JDEY",
			comments: [],
		},
		rows: [
			[
				{
					type: "text",
					_id: "NCVN6M7QNVHZPK5SGZT7BRWJIE",
					content: "Row 1",
				},
				{
					type: "text",
					_id: "SAEATQV3KFGYFP2MRS7PR77BFQ",
					content: "<b>Bold</b>",
				},
				{
					type: "text",
					_id: "AIVM5HH3U5FW5IUHJAK4ZJ3NXU",
					content: "<b>Bold 1</b>",
				},
				{
					type: "text",
					_id: "BDCBB6WNURBBBEG3NUQ7WF4CNE",
					content: "<b>Bold 2</b>",
				},
			],
			[
				{
					type: "text",
					_id: "WZM4E34ECNGPNMKCOGWAQMJJDI",
					content: "Row 2",
				},
				{
					type: "text",
					_id: "N3JRDQOXMNHYNETDUDY37W7YWY",
					content: "<i>Italic</i>",
				},
				{
					type: "text",
					_id: "RYTQC4CT6FD6JGN275JLXVMQIQ",
					content: "<i>Italic</i>",
				},
				{
					type: "text",
					_id: "RYNFLRWNLRFLFOC2BP6NPSIR6M",
					content: "<i>Italic</i>",
				},
			],
			[
				{
					type: "text",
					_id: "V6EEDBLTJFGZJIHQBMEIWER2EI",
					content: "Row 3",
				},
				{
					type: "text",
					_id: "PN22E5MLF5FEVNO4U2X3EWSZAU",
					content: "<u>Underline</u>",
				},
				{
					type: "text",
					_id: "R53HJQUOMFFBBFAGW42G5YF7VQ",
					content: "<u>Underline</u>",
				},
				{
					type: "text",
					_id: "GL57G7MP4VG3BIG4UYE3JVCFJY",
					content: "<u>Underline</u>",
				},
			],
			[
				{
					type: "text",
					_id: "QMLAUA2K5NFYJAZRUDPOY3ESV4",
					content: "Row 4",
				},
				{
					type: "text",
					_id: "JWWCXFBHWNB6JO4DBUVHQILH3Q",
					content: "Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				},
				{
					type: "text",
					_id: "O2PGG542P5GBNCYDRLRH6T2BOA",
					content: "Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				},
				{
					type: "text",
					_id: "YOGUWFM2JBB7FOI2OX4FD6G5LE",
					content: "Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				},
			],
		],
	};

	it('should render the table correctly', () => {
		render(<Table element={tableData} />);
		
		const table = screen.getByRole('table');
		expect(table).toBeInTheDocument();
	  
		const rowgroups = within(table).getAllByRole('rowgroup');
		const thead = rowgroups.find((rg) => rg.tagName.toLowerCase() === 'thead');
		expect(thead).toBeInTheDocument();
	  
		const headerRow = within(thead).getByRole('row');
		expect(headerRow).toBeInTheDocument();
	  
		const headerColumns = within(headerRow).getAllByRole('columnheader');
		expect(headerColumns[0]).toHaveTextContent('Column 1');
		expect(headerColumns[1]).toHaveTextContent('Column 2');
	  
		const tbody = rowgroups.find((rg) => rg.tagName.toLowerCase() === 'tbody');
		expect(tbody).toBeInTheDocument();
	  
		const rows = within(tbody).getAllByRole('row');
		expect(rows).toHaveLength(4);
	  
		const firstRow = rows[0];
		expect(within(firstRow).getByText('Row 1')).toBeInTheDocument();
		expect(within(firstRow).getByText('Bold')).toBeInTheDocument();
	  });
});
