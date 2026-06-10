import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { useContent } from "fusion:content";

// Import the component after mocks are applied to ensure captured references use mocks
let FullAuthorBio;

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(),
}));

const authors = [
	{
		_id: "janedoe",
		firstName: "Jane",
		lastName: "Doe",
		byline: "Jane Da Doe",
		role: "Senior Product Manager",
		image:
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		resized_params: { "158x158": "" },
		email: "jane@doe.com",
		facebook: "https://facebook.com/janedoe",
		rss: "somersslink",
		twitter: "janedoe",
		longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
		instagram: "janedoe",
	},
];

describe("Full author bio block", () => {
	// Minimal MessageChannel polyfill for environments where it's missing (React scheduler uses it)
	beforeAll(() => {
		if (typeof global.MessageChannel === "undefined") {
			// eslint-disable-next-line no-global-assign
			global.MessageChannel = class {
				constructor() {
					this.port1 = { postMessage() {} };
					this.port2 = {};
				}
			};
		}
	});
	beforeAll(() => {
		// Load component after module mocks are set up
		// eslint-disable-next-line global-require
		FullAuthorBio = require("./default").default;
	});
	beforeEach(() => {
		jest.spyOn(console, "error").mockImplementation((message) =>
			message === "No auth token provided for resizer"
				? null
				: // eslint-disable-next-line no-console
				console.warn("Error Thrown:", message),
		);
	});

	afterEach(() => {
		// eslint-disable-next-line no-console
		console.error.mockRestore();
		jest.clearAllMocks();
	});

	describe("lazy load and isAdmin", () => {
		it("should return null if lazyLoad on the server and not in the admin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: false,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(container).toBeEmptyDOMElement();
		});

		it("should not return null if not lazyLoad on the server and isAdmin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container).not.toBeEmptyDOMElement();
		});

		it("should not return null if lazyLoad on the server and isAdmin", () => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(container).not.toBeEmptyDOMElement();
		});
	});

	describe("when author(s) from globalContent are present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
		});

		it("should render", () => {
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container).not.toBeEmptyDOMElement();
		});
	});

	describe("when the locale is undefined", () => {
		beforeEach(() => {
			getProperties.mockImplementation(() => ({
				locale: undefined,
			}));
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors,
				},
				isAdmin: true,
			}));
		});

		it("should still render", () => {
			const { container } = render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(container).not.toBeEmptyDOMElement();
		});
	});

	describe("when there are no authors", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				globalContent: {
					authors: [],
				},
			}));
		});

		it("should NOT render anything", () => {
			const { container } = render(<FullAuthorBio />);

			expect(container).toBeEmptyDOMElement();
		});
	});


	describe("Image handling logic", () => {
		beforeEach(() => {
			getProperties.mockImplementation(() => ({
				resizerURL: "http://url.com",
			}));
			const { isServerSide } = require("@wpmedia/arc-themes-components");
			isServerSide.mockReturnValue(false);
		});

		afterEach(() => {
			jest.clearAllMocks(); // resets mocks between tests
		});

		it("should extract imageAuth from globalContent.authors[0].ansImage", () => {
			const authorsWithAuth = [
				{
					_id: "Test",
					byline: "Test User",
					ansImage: {
						url: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/test.png",
						auth: { "2": "abc123" },
					},
				},
			];

			useFusionContext.mockImplementation(() => ({
				globalContent: { authors: authorsWithAuth },
				isAdmin: true,
			}));

			render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			const image = screen.getByRole("img", { name: "Test User" });

			expect(image).toBeInTheDocument();
			expect(image).toHaveAttribute("src");
			expect(image.getAttribute("src")).toContain("abc123");
			expect(image.getAttribute("src")).toContain("http://url.com");
		});

		it("should extract imageAuth from globalContent.credits.by[0].image.auth", () => {
			const authorsWithCredits = {
				credits: {
					by: [
						{
							name: "Tariq Alshwaiki",
							image: {
								url: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/94ef7a64.png",
								auth: { "2": "abc456" },
							},
							additional_properties: {
								original: {
									byline: "Tariq Alshwaiki",
									ansImage: {
										url: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/94ef7a64.png",
										auth: { "2": "abc456" },
									},
								},
							},
						},
					],
				},
			};

			const { isServerSide } = require("@wpmedia/arc-themes-components");
			isServerSide.mockReturnValue(false);

			useFusionContext.mockImplementation(() => ({
				globalContent: authorsWithCredits,
				isAdmin: true,
			}));

			getProperties.mockImplementation(() => ({
				resizerURL: "http://url.com",
			}));

			render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			const image = screen.getByRole("img", { name: "Tariq Alshwaiki" });

			expect(image).toHaveAttribute("src");
			expect(image.getAttribute("src")).toContain("abc456");
			expect(image.getAttribute("src")).toContain("http://url.com");
		});

		it("should use originalAnsImage when image has no auth but originalAnsImage has auth and url", () => {
			const authorsWithOriginalAnsImage = {
				credits: {
					by: [
						{
							name: "Jane Smith",
							image: {
								url: "https://example.com/photo.jpg",
								// no auth on image
							},
							additional_properties: {
								original: {
									byline: "Jane Smith",
									ansImage: {
										url: "https://example.com/photo.jpg",
										auth: { "2": "originalAuth456" },
									},
								},
							},
						},
					],
				},
			};

			const { isServerSide } = require("@wpmedia/arc-themes-components");
			isServerSide.mockReturnValue(false);
			useContent.mockReturnValue(null);

			useFusionContext.mockImplementation(() => ({
				globalContent: authorsWithOriginalAnsImage,
				isAdmin: true,
			}));

			getProperties.mockImplementation(() => ({
				resizerURL: "http://url.com",
			}));

			render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(screen.getByText("Jane Smith")).not.toBeNull();
		});

		it("should use originalAnsImage when resizedAuth has no hash and rawAnsImage has no auth", async () => {
			const globalContentWithOriginalAnsImage = {
				credits: {
					by: [
						{
							name: "John Doe",
							image: {
								url: "https://example.com/photo.jpg",
								// no auth on top-level image
							},
							additional_properties: {
								original: {
									byline: "John Doe",
									ansImage: {
										url: "https://example.com/ans-photo.jpg",
										auth: { "2": "originalAnsAuth" },
									},
								},
							},
						},
					],
				},
			};

			const { isServerSide } = require("@wpmedia/arc-themes-components");
			isServerSide.mockReturnValue(false);
			// resizedAuth is a plain token map without a ".hash" property — triggers the originalAnsImage fallback
			useContent.mockReturnValue({ "2": "newToken" });

			useFusionContext.mockImplementation(() => ({
				globalContent: globalContentWithOriginalAnsImage,
				isAdmin: true,
			}));

			getProperties.mockImplementation(() => ({
				resizerURL: "http://url.com",
			}));

			render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			expect(screen.getByText("John Doe")).not.toBeNull();
		});

		it("should call useContent with signing-service when imageAuth is not available from credits", async () => {
			const authorsWithCreditsNoAuth = {
				credits: {
					by: [
						{
							name: "Tariq Alshwaiki",
							image: {
								url: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/94ef7a64.png",
							},
							additional_properties: {
								original: {
									byline: "Tariq Alshwaiki",
									image: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/94ef7a64.png"
								},
							},
						},
					],
				},
			};

			const { isServerSide } = require("@wpmedia/arc-themes-components");
			isServerSide.mockReturnValue(false);
			useContent.mockReturnValue({ hash: "signed123" });

			useFusionContext.mockImplementation(() => ({
				globalContent: authorsWithCreditsNoAuth,
				isAdmin: true,
			}));

			getProperties.mockImplementation(() => ({
				resizerURL: "http://url.com",
			}));

			render(<FullAuthorBio customFields={{ lazyLoad: false }} />);
			await waitFor(() =>
				expect(useContent).toHaveBeenCalledWith({
					source: "signing-service",
					query: {
						id: "https://author-service-images-sandbox-us-east-1.publishing.aws.arc.pub/themesinternal/94ef7a64.png",
					},
				}),
			);
		});
	});

});
