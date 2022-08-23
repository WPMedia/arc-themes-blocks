import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
// presentational component not container
import ShareBarContainer, { ShareBar } from "./default";

const mockPhrases = { t: jest.fn((phrase) => phrase) };
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
		const { getAllByRole } = render(
			<ShareBar
				customFields={customFields}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
				phrases={mockPhrases}
			/>
		);
		const buttons = getAllByRole("button");
		expect(buttons).toHaveLength(5);
	});

	it("should not show social buttons that are marked as false", () => {
		customFields.email = true;
		customFields.facebook = false;
		customFields.pinterest = true;
		customFields.twitter = false;
		customFields.linkedIn = true;

		const { getAllByRole } = render(
			<ShareBar
				customFields={customFields}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
				phrases={mockPhrases}
			/>
		);

		const buttons = getAllByRole("button");
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
				phrases={mockPhrases}
			/>
		);
		expect(container.firstChild).toBeNull();
	});

	it("should not render if custom fields are undefined", () => {
		const { container } = render(
			<ShareBar
				customFields={undefined}
				websiteName={websiteName}
				websiteDomain={websiteDomain}
				websiteUrl={websiteUrl}
				headlineString={headlineString}
				phrases={mockPhrases}
			/>
		);
		expect(container.firstChild).toBeNull();
	});

	describe("Social Buttons Interactions", () => {
		it("should open a new window when Email button is clicked", async () => {
			customFields.email = true;
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
					phrases={mockPhrases}
				/>
			);
			global.open = jest.fn();
			await fireEvent(
				container.querySelector("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Facebook button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = true;
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
					phrases={mockPhrases}
				/>
			);
			global.open = jest.fn();
			await fireEvent(
				container.querySelector("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Pinterest button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = true;
			customFields.twitter = false;
			customFields.linkedIn = false;
			const { container } = render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
					phrases={mockPhrases}
				/>
			);
			global.open = jest.fn();
			await fireEvent(
				container.querySelector("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Twitter button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = false;
			customFields.twitter = true;
			customFields.linkedIn = false;
			const { container } = render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
					phrases={mockPhrases}
				/>
			);
			global.open = jest.fn();
			await fireEvent(
				container.querySelector("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when LinkedIn button is clicked", async () => {
			customFields.email = false;
			customFields.facebook = false;
			customFields.pinterest = false;
			customFields.twitter = false;
			customFields.linkedIn = true;
			const { container } = render(
				<ShareBar
					customFields={customFields}
					websiteName={websiteName}
					websiteDomain={websiteDomain}
					websiteUrl={websiteUrl}
					headlineString={headlineString}
					phrases={mockPhrases}
				/>
			);
			global.open = jest.fn();
			await fireEvent(
				container.querySelector("button"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});
	});

	describe("Share Bar Container", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			getTranslatedPhrases.mockImplementation(() => ({}));
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
					phrases={mockPhrases}
				/>
			);
			expect(container.firstChild).not.toBeNull();
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
					phrases={mockPhrases}
				/>
			);
			expect(container.firstChild).not.toBeNull();
		});
	});
});
