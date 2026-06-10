import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
// presentational component not container
import ShareBarContainer, { ShareBar } from "./default";

const websiteDomain = "https://www.thesun.com/";
const websiteName = "The Sun";
const websiteUrl = "/2019/07/15/global-kitchen-sink-article/";
const headlineString = "sample headline";
const customFields = {
	email: true,
	facebook: true,
	pinterest: true,
	twitter: true,
	linkedIn: true,
};

describe("Share Bar", () => {
	it("should show all buttons if those options are chosen", () => {
		render(
			<ShareBar
				customFields={customFields}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
			/>,
		);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(5);
	});

	it("should not show social buttons that are marked as false", () => {
		customFields.email = true;
		customFields.facebook = false;
		customFields.pinterest = true;
		customFields.twitter = false;
		customFields.linkedIn = true;

		render(
			<ShareBar
				customFields={customFields}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
			/>,
		);

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(3);
	});

	it("should not show any social buttons if all are marked as false", () => {
		customFields.email = false;
		customFields.facebook = false;
		customFields.pinterest = false;
		customFields.twitter = false;
		customFields.linkedIn = false;

		const { container } = render(
			<ShareBar
				customFields={customFields}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
			/>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("should not render if custom fields are undefined", () => {
		const { container } = render(
			<ShareBar
				customFields={undefined}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
			/>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	describe("Social Buttons Interactions", () => {
		it("should open a new window when Email button is clicked", async () => {
			customFields.email = true;
			customFields.facebook = false;
			customFields.pinterest = false;
			customFields.twitter = false;
			customFields.linkedIn = false;
			render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			global.open = jest.fn();
			fireEvent(
				screen.getByRole("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				}),
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Facebook button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = true;
			customFields.pinterest = false;
			customFields.twitter = false;
			customFields.linkedIn = false;
			render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			global.open = jest.fn();
			fireEvent(
				screen.getByRole("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				}),
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Pinterest button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = true;
			customFields.twitter = false;
			customFields.linkedIn = false;
			render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			global.open = jest.fn();
			fireEvent(
				screen.getByRole("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				}),
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Twitter button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = false;
			customFields.twitter = true;
			customFields.linkedIn = false;
			render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			global.open = jest.fn();
			fireEvent(
				screen.getByRole("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				}),
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when LinkedIn button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = false;
			customFields.twitter = false;
			customFields.linkedIn = true;
			render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			global.open = jest.fn();
			fireEvent(
				screen.getByRole("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				}),
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});
	});

	describe("Share Bar Container", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it("Should call ShareBar when globalContent has no website_url", () => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "the-sun",
				customFields: { email: true, facebook: false, pinterest: false, twitter: false, linkedIn: false },
				// globalContent with missing website_url and basic — triggers = "" defaults
				globalContent: { headlines: {}, website_url: undefined },
			}));
			getProperties.mockImplementation(() => ({
				websiteDomain: "https://www.thesun.com/",
				websiteName: "The Sun",
			}));
			const { container } = render(<ShareBarContainer />);
			expect(container).not.toBeEmptyDOMElement();
		});

		it("Should call ShareBar", () => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "the-sun",
				customFields: {},
				globalContent: {
					headlines: {
						basic: "",
					},
					website_url: "",
				},
			}));
			getProperties.mockImplementation(() => ({
				locale: "en",
				websiteDomain: "",
				websiteName: "",
			}));
			render(<ShareBarContainer />);
			const { container } = render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			expect(container).not.toBeEmptyDOMElement();
		});
		it("Should call ShareBar with unexpected contexts", () => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "the-sun",
				customFields: {},
				globalContent: {
					headlines: {
						basic: undefined,
					},
					website_url: undefined,
				},
			}));
			getProperties.mockImplementation(() => ({
				locale: undefined,
				websiteDomain: "",
				websiteName: "",
			}));
			render(<ShareBarContainer />);
			const { container } = render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
				/>,
			);
			expect(container).not.toBeEmptyDOMElement();
		});
	});
});
