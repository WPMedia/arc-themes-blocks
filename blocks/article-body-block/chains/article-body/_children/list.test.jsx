import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "./list";

describe("the article body List component", () => {
	it("should render unordered list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "unordered",
			items: [
				{
					type: "text",
					content: "Indented under 2",
					_id: "IOY3SN76GVFI3MUDN3PX4V32AA",
				},
				{
					type: "text",
					content: "Another thing indented under 2",
					_id: "MX643WWQPZCYZHTZYMHCIML6SU",
				},
			],
			_id: "PSQTOBXAGZGKNOSBMOAUJ6EYSA",
		};

		render(<List listType={listContent.list_type} listItems={listContent.items} />);

		const ul = screen.getByRole('list');
		expect(ul).toBeInTheDocument();
	
		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(2);
		expect(listItems[0].textContent).toBe('Indented under 2');
		expect(listItems[1].textContent).toBe('Another thing indented under 2');
	});

	it("should render ordered list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "ordered",
			items: [
				{
					type: "text",
					content: "Indented under 2",
					_id: "OWQEXQT6N5BTPF2CDZYVND6IAQ",
				},
				{
					type: "text",
					content: "Another thing indented under 2",
					_id: "UG52XTXHHRDN5KUPKCGTKE4NMM",
				},
			],
			_id: "FLXZDZLOFRGNLMALFGLJGLDPAM",
		};

		render(<List listType={listContent.list_type} listItems={listContent.items} />);
		const listItems = screen.getAllByRole('listitem');

		expect(listItems).toHaveLength(2);
		expect(listItems[0].textContent).toBe('Indented under 2');
		expect(listItems[1].textContent).toBe('Another thing indented under 2');
	});

	it("should render nested list correctly", () => {
		const listContent = {
			type: "list",
			list_type: "ordered",
			items: [
				{
					type: "list",
					list_type: "unordered",
					items: [
						{
							type: "text",
							content: "Indented under 2",
							_id: "IOY3SN76GVFI3MUDN3PX4V32AA",
						},
						{
							type: "text",
							content: "Another thing indented under 2",
							_id: "MX643WWQPZCYZHTZYMHCIML6SU",
						},
					],
					_id: "PSQTOBXAGZGKNOSBMOAUJ6EYSA",
				},
				{
					type: "text",
					content: "Another thing indented under 3",
					_id: "UG52XTXHHRDN5KUPKCGTKE4NMM",
				},
			],
			_id: "FLXZDZLOFRGNLMALFGLJGLDPAM",
		};

		render(<List listType={listContent.list_type} listItems={listContent.items} />);
	
		const listItems = screen.getAllByRole('listitem');
	
		expect(listItems).toHaveLength(3);
	
		const [firstItem, secondItem, thirdItem] = listItems;
	
		expect(firstItem.textContent).toBe('Indented under 2');
		expect(secondItem.textContent).toBe('Another thing indented under 2');
		expect(thirdItem.textContent).toBe('Another thing indented under 3');
	});
});
