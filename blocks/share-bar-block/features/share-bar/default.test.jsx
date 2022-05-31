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

		const buttons = container.querySelectorAll(".b-share-bar button");
		const emailButton = container.querySelectorAll("#article-share-email");
		const facebookButton = container.querySelectorAll("#article-share-facebook");
		const pinterestButton = container.querySelectorAll("#article-share-pinterest");
		const twitterButton = container.querySelectorAll("#article-share-twitter");
		const linkedinButton = container.querySelectorAll("#article-share-linkedIn");

		expect(buttons).toHaveLength(5);
		expect(emailButton).toHaveLength(1);
		expect(facebookButton).toHaveLength(1);
		expect(pinterestButton).toHaveLength(1);
		expect(twitterButton).toHaveLength(1);
		expect(linkedinButton).toHaveLength(1);
	});

	it("should not show social buttons that are marked as false", () => {
		customFields.email = true;
		customFields.facebook = false;
		customFields.pinterest = true;
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

		const emailButton = container.querySelectorAll("#article-share-email");
		const facebookButton = container.querySelectorAll("#article-share-facebook");
		const pinterestButton = container.querySelectorAll("#article-share-pinterest");
		const twitterButton = container.querySelectorAll("#article-share-twitter");
		const linkedinButton = container.querySelectorAll("#article-share-linkedIn");

		expect(emailButton).toHaveLength(1);
		expect(facebookButton).toHaveLength(0);
		expect(pinterestButton).toHaveLength(1);
		expect(twitterButton).toHaveLength(0);
		expect(linkedinButton).toHaveLength(1);
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

	describe("Social Buttons Interactions", () => {
		it("should open a new window when Email button is clicked", async () => {
			customFields.email = true;
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
				container.querySelector("#article-share-email"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Facebook button is clicked", async () => {
			customFields.facebook = true;
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
				container.querySelector("#article-share-facebook"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Pinterest button is clicked", async () => {
			customFields.pinterest = true;
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
				container.querySelector("#article-share-pinterest"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when Twitter button is clicked", async () => {
			customFields.twitter = true;
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
				container.querySelector("#article-share-twitter"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});

		it("should open a new window when LinkedIn button is clicked", async () => {
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
				container.querySelector("#article-share-linkedIn"),
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
				})
			);
			await expect(window.open).toBeCalled();
			expect(window.location.origin).toEqual("http://localhost");
		});

		/*
			const facebookButton = container.querySelector("#article-share-facebook");
			const pinterestButton = container.querySelector("#article-share-pinterest");
			const twitterButton = container.querySelector("#article-share-twitter");
			const linkedinButton = container.querySelector("#article-share-linkedIn");
			*/
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
