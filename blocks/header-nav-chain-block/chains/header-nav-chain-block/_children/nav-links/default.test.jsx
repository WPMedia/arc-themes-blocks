/* eslint-disable no-irregular-whitespace */
import React from "react";
import { render, screen } from "@testing-library/react";
import { useContent } from "fusion:content";
import LinksBar from "./default";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
		id: "testId",
	})),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({}))
}));

describe("the links bar feature for the default output type", () => {
	it("should not have separator only one link", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
			],
		});
		render(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots
			/>
		);
		expect(screen.getByRole("link")).not.toBeNull();
		expect(screen.queryByTestId("nav-chain-link-bar-separator")).toBeNull();
	});

	it("should have separator when more than one link", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
				{
					_id: "id_3",
					name: "test link 3",
				},
			],
		});
		render(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots
			/>
		);

		expect(screen.getAllByRole("link")).toHaveLength(3);
		expect(screen.getAllByTestId("nav-chain-link-bar-separator")).toHaveLength(2);
	});

	it("should not have separator when more than one link and showHorizontalSeperatorDots is false", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
			],
		});
		render(
			<LinksBar
				blockClassName="b-header-nav-chain"
				customFields={{ navigationConfig: "links" }}
				showHorizontalSeperatorDots={false}
			/>
		);
		expect(screen.getAllByRole("link")).toHaveLength(2);
		expect(screen.queryByTestId("nav-chain-link-bar-separator")).toBeNull();
	});

	it("should contain the equal number of links between input and output", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
				{
					_id: "id_3",
					node_type: "link",
					url: "/",
					display_name: "Link Text",
				},
				{
					_id: "id_4",
					node_type: "link",
					url: "http://arcpublishing.com",
					display_name: "Link Text",
				},
			],
		});
		render(
			<LinksBar blockClassName="b-header-nav-chain" customFields={{ navigationConfig: "links" }} />
		);
		expect(screen.getAllByRole("link")).toHaveLength(4);
	});

	it("should have no menu item if no content is returned", () => {
		useContent.mockReturnValueOnce({
			children: [],
		});
		render(
			<LinksBar blockClassName="b-header-nav-chain" customFields={{ navigationConfig: "links" }} />
		);

		expect(screen.queryByRole("link")).toBeNull();
	});

	it("should render the block with the default aria-label", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
				{
					_id: "id_3",
					node_type: "link",
					url: "/",
					display_name: "Link Text",
				},
				{
					_id: "id_4",
					node_type: "link",
					url: "http://arcpublishing.com",
					display_name: "Link Text",
				},
			],
		});
		render(<LinksBar blockClassName="b-header-nav-chain" />);
		expect(screen.getByLabelText("header-nav-chain-block.links-element-aria-label")).not.toBeNull();
	});

	it("should render the block with the custom aria-label", () => {
		useContent.mockReturnValueOnce({
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
				{
					_id: "id_3",
					node_type: "link",
					url: "/",
					display_name: "Link Text",
				},
				{
					_id: "id_4",
					node_type: "link",
					url: "http://arcpublishing.com",
					display_name: "Link Text",
				},
			],
		});
		render(<LinksBar blockClassName="b-header-nav-chain" ariaLabel="Links" />);

		expect(screen.getByLabelText("Links")).not.toBeNull();
	});
});
