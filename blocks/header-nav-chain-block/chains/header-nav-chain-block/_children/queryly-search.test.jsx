import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import QuerylySearch from "./queryly-search";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
		navBarBackground: "",
		navColor: "dark",
	}))
);
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "dagen",
	})),
}));

describe("<QuerylySearch/>", () => {
	it("renders", () => {
		render(<QuerylySearch />);
		expect(screen.getByLabelText("header-nav-chain-block.search-text")).not.toBeNull();
	});

	it("affects the querly toggle on click", () => {
		const MockQuerlyToggle = () => (
			<input type="checkbox" id="queryly_toggle" checked={false} onChange={() => {}} />
		);

		// via https://stackoverflow.com/a/43734834/7491536
		// in order to use document.body queries, have to attach to body
		// not ideal using getElementById within a react component
		render(
			<>
				<MockQuerlyToggle />
				<QuerylySearch />
			</>,
			{ attachTo: document.body }
		);
		expect(screen.getByRole("checkbox")).not.toBeChecked();
		fireEvent.click(screen.getByLabelText("header-nav-chain-block.search-text"));
		expect(screen.getByRole("checkbox")).toBeChecked();
	});
});
