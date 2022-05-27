import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// presentational component not container
import { ShareBar } from "./default";

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

	it("should not show social buttons that are marked as false", () => {
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
});
