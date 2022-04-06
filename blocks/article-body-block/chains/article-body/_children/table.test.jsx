const React = require("react");
const { mount } = require("enzyme");

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
					content: "<b>Bold</b>",
				},
				{
					type: "text",
					_id: "BDCBB6WNURBBBEG3NUQ7WF4CNE",
					content: "<b>Bold</b>",
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

	it("should render table correctly", () => {
		const { default: Table } = require("./table");
		const wrapper = mount(<Table element={tableData} />);
		expect(wrapper.find(Table)).toHaveLength(1);
		expect(wrapper.find("thead")).toHaveLength(1);
		expect(wrapper.find("thead").find("tr").childAt(0).html()).toMatch("<th>Column 1</th>");
		expect(wrapper.find("thead").find("tr").childAt(1).html()).toMatch("<th>Column 2</th>");
		expect(wrapper.find("tbody")).toHaveLength(1);
		expect(wrapper.find("tbody").children()).toHaveLength(4);
		expect(wrapper.find("tbody").childAt(0).childAt(0).html()).toMatch("<td>Row 1</td>");
		expect(wrapper.find("tbody").childAt(0).childAt(1).html()).toMatch("<td><b>Bold</b></td>");
	});
});
