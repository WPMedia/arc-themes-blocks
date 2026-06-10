import React from "react";
import { act, render, screen } from "@testing-library/react";

import { isServerSide, useIdentity } from "@wpmedia/arc-themes-components";
import Offer from "./default";
import useOffer from "../../components/useOffer";

jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue("some value");
jest.spyOn(URLSearchParams.prototype, "has").mockReturnValue(false);

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(),
	useIdentity: jest.fn(),
}));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "gazette",
	})),
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			retail: {
				endpoint: "/retail/public/v1/offer/live/",
				origin: "https://corecomponents-the-gazette-prod.api.cdn.arcpublishing.com",
			},
		},
	})),
);

jest.mock("@arc-publishing/sdk-sales");
jest.mock("../../components/useOffer");

const HEADLINE_TEXT = "Get access today!";
const SUBHEADLINE_TEXT = "Subscribe to any of our sections";
const sampleOffer = {
	name: "All Products Offer",
	disclaimerText: "<p>Terms apply</p>",
	largeImage: null,
	mediumImage: null,
	smallImage: null,
	pageSubTitle: `<p>${SUBHEADLINE_TEXT}</p>`,
	pageTitle: `<p>${HEADLINE_TEXT}</p>`,
	templateName: "a",
	campaigns: [],
	products: [],
	attributes: [],
	default: false,
};

const defaultCustomFields = {
	campaignCode: "allaccess",
	loginURL: "/login/",
	checkoutURL: "/checkout/",
};

describe("The Offer feature", () => {
	beforeEach(() => {
		isServerSide.mockReturnValue(false);
		useIdentity.mockReturnValue({
			Identity: { isLoggedIn: jest.fn(() => Promise.resolve(false)) },
			isInitialized: true,
		});
		useOffer.mockReturnValue({
			offer: sampleOffer,
			fetchOffer: () => sampleOffer,
			isFetching: false,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the offer container", async () => {
		await act(async () => {
			render(<Offer customFields={defaultCustomFields} />);
		});
		expect(document.querySelector(".b-offer")).not.toBeNull();
	});

	it("renders headline and subheadline from offer data", async () => {
		await act(async () => {
			render(<Offer customFields={defaultCustomFields} />);
		});
		expect(screen.getByText(HEADLINE_TEXT)).not.toBeNull();
		expect(screen.getByText(SUBHEADLINE_TEXT)).not.toBeNull();
	});

	it("renders nothing when isFetching is true", async () => {
		useOffer.mockReturnValue({ isFetching: true, offer: null, fetchOffer: () => null });
		await act(async () => {
			render(<Offer customFields={defaultCustomFields} />);
		});
		expect(document.querySelector(".b-offer__headings")).toBeNull();
	});

	it("returns null when server-side", async () => {
		isServerSide.mockReturnValue(true);
		const { container } = render(<Offer customFields={defaultCustomFields} />);
		expect(container.firstChild).toBeNull();
	});

	it("uses url campaign param when present", async () => {
		jest.spyOn(URLSearchParams.prototype, "has").mockReturnValueOnce(true);
		jest.spyOn(URLSearchParams.prototype, "get").mockReturnValueOnce("urlcampaign");
		await act(async () => {
			render(<Offer customFields={defaultCustomFields} />);
		});
		expect(useOffer).toHaveBeenCalledWith(expect.objectContaining({ campaignCode: "urlcampaign" }));
	});

	it("falls back to customField campaignCode when no url param", async () => {
		jest.spyOn(URLSearchParams.prototype, "has").mockReturnValueOnce(false);
		await act(async () => {
			render(<Offer customFields={defaultCustomFields} />);
		});
		expect(useOffer).toHaveBeenCalledWith(
			expect.objectContaining({ campaignCode: "allaccess" }),
		);
	});

	it("falls back to 'default' campaign when campaignCode customField is absent", async () => {
		jest.spyOn(URLSearchParams.prototype, "has").mockReturnValueOnce(false);
		await act(async () => {
			render(<Offer customFields={{ loginURL: "/login/", checkoutURL: "/checkout/" }} />);
		});
		expect(useOffer).toHaveBeenCalledWith(expect.objectContaining({ campaignCode: undefined }));
	});
});
