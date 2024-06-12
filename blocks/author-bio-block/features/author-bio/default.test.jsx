import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AuthorBio, { AuthorBioItems } from "./default";

jest.mock("@wpmedia/arc-themes-components", () => ({
	__esModule: true,
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn().mockReturnValue(true),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:context", () => ({
	useFusionContext: () => ({ isAdmin: false, globalContent: { credits: {} } }),
}));

describe("Given the list of author(s) from the article", () => {
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
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const { container } = render(<AuthorBio customFields={{ lazyLoad: true }} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should return null if empty global content object", () => {
		const { container } = render(<AuthorBio />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should return null if credits are missing", () => {
		const { container } = render(<AuthorBioItems content={{}} />);

		expect(container).toBeEmptyDOMElement();
	});

	it("should return null if additional_properties are missing", () => {
		const { container } = render(
			<AuthorBioItems
				content={{
					credits: {
						by: [
							{
								type: "author",
								name: "Sara Carothers",
								description: "description",
								image: {
									url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
								},
							},
						],
					},
				}}
			/>,
		);

		expect(container).toBeEmptyDOMElement();
	});

	it("should render even if byline is missing", () => {
		render(
			<AuthorBioItems
				content={{
					credits: {
						by: [
							{
								type: "author",
								name: "Sara Carothers",
								description: "description",
								image: {
									url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
								},
								additional_properties: {
									original: {
										_id: "saracarothers",
										bio_page: "/author/sara-carothers/",
										bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									},
								},
							},
						],
					},
				}}
			/>,
		);

		expect(screen.getByRole("img", { name: "Sara Carothers" })).not.toBeNull();
	});

	it("should show one author's bio", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.getByRole("img", { name: "Sara Carothers" })).toHaveAttribute(
			"src",
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		);
		expect(screen.getByRole("heading", { name: "Sara Lynn Carothers" })).not.toBeNull();
	});

	it("should show two authors' bio", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
					{
						type: "author",
						name: "Sara Carothers2",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers2",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.getByRole("img", { name: "Sara Carothers" })).toHaveAttribute(
			"src",
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		);
		expect(screen.getByRole("img", { name: "Sara Carothers2" })).toHaveAttribute(
			"src",
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		);
		expect(screen.queryAllByRole("heading")).toHaveLength(2);
	});

	it("should show no author if there's no description", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		const { container } = render(<AuthorBioItems content={content} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should show no social buttons if there are no urls provided", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [{ site: "twitter" }, { site: "instagram" }],
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.queryAllByRole("link")).toHaveLength(0);
	});

	it("should include the author image when the author image url is present", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.getByRole("img", { name: "Sara Carothers" })).toHaveAttribute(
			"src",
			"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
		);
	});

	it("should not have an author image element if there is no author image url", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.queryAllByRole("img")).toHaveLength(0);
	});

	it("should not show an image if there is no image object", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};

		render(<AuthorBioItems content={content} />);
		expect(screen.queryAllByRole("img")).toHaveLength(0);
	});

	it("should show social icons for youtube, tumblr, Medium, Reddit, Pinterest, snap, whatsapp, facebook, rss, soundcloud not the mail fallback", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [
							{ site: "twitter", url: "https://twitter.com/sLcarothers" },
							{
								site: "instagram",
								url: "https://www.instagram.com/scarothers/",
							},
							{ site: "facebook", url: "https://www.thefacebook.com" },
							{ site: "reddit", url: "https://reddit.com" },
							{ site: "youtube", url: "https://youtube.com" },
							{ site: "medium", url: "https://medium.com" },
							{ site: "tumblr", url: "https://tumblr.com" },
							{ site: "pinterest", url: "https://pinterest.com" },
							{ site: "snapchat", url: "https://snapchat.com" },
							{ site: "whatsapp", url: "https://whatsapp.com" },
							{ site: "linkedin", url: "https://whatsapp.com" },
							{ site: "rss", url: "rss feed" },
							{ site: "soundcloud", url: "https://soundcloud.com" },
						],
					},
				],
			},
		};

		const socialLabels = [
			"global.social-twitter-connect",
			"global.social-instagram-connect",
			"global.social-facebook-connect",
			"global.social-reddit-connect",
			"global.social-youtube-connect",
			"global.social-medium-connect",
			"global.social-tumblr-connect",
			"global.social-pinterest-connect",
			"global.social-snapchat-connect",
			"global.social-whatsapp-connect",
			"global.social-linkedin-connect",
			"global.social-rss-connect",
			"global.social-soundcloud-connect",
		];

		render(<AuthorBioItems content={content} />);
		const socialLinks = screen.queryAllByRole("link");
		expect(socialLinks).toHaveLength(13);
		socialLinks.forEach((link, index) =>
			expect(link).toHaveAttribute("aria-label", socialLabels[index]),
		);
	});
	it("should show null if no social link objects, with url and title, are provided", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [],
					},
				],
			},
		};

		render(<AuthorBioItems content={content} />);

		const socialLinks = screen.queryAllByRole("link");
		expect(socialLinks).toHaveLength(0);
	});

	it("a snapchat social object does not render the default envelope icon but its correct snap one", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [{ site: "snapchat", url: "https://snapchat.com" }],
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		const socialLinks = screen.queryAllByRole("link");
		expect(socialLinks[0]).toHaveAttribute("href", "https://snapchat.com");
	});

	it("an unrecognized social media title renders an envelope icon with site as key", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [
							{
								site: "Something Gamechanging",
								url: "https://tiktiktoktoktok.com",
							},
						],
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(
			screen.getByRole("link", { name: "global.social-something gamechanging-connect" }),
		).toHaveAttribute("href", "https://tiktiktoktoktok.com");
	});

	it("should fallback gracefully if author name does not exist and not render authorName link", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);
		expect(screen.queryByRole("heading")).toBeNull();
	});

	it("finds an author name if url exists", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						url: "https://google.com",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		expect(
			screen.getByRole("link", { name: "Sara Lynn Carothers Opens in new window" }),
		).not.toBeNull();
		expect(screen.getByRole("heading", { name: "Sara Lynn Carothers" })).not.toBeNull();
	});

	it("handles no author name or description", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "",
						description: "desc",
						url: "https://google.com",
						image: {
							url: "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		expect(screen.getByRole("img", { name: "" })).not.toBeNull();
	});

	it("it should show email link with malito email", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "",
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
						social_links: [{ site: "email", url: "bernstein@washpost.com" }],
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		const socialLinks = screen.queryAllByRole("link");
		expect(socialLinks[0]).toHaveAttribute("href", "mailto:bernstein@washpost.com");
	});

	it("should not throw by undefined error if empty global content object", () => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({ globalContent: {} })),
		}));

		expect(() => {
			render(<AuthorBio />);
		}).not.toThrow(TypeError("Cannot read property 'by' of undefined"));
	});

	it("should render the resized photo if resizer information is available", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							url: "resized.jpg",
							auth: { 2: "12345" },
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		const image = screen.queryByRole("img");
		expect(image?.src).toBe(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=100&height=100",
		);
		const imageSrcSet = new Set(image?.srcset?.split(", "));
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=100&height=100 100w",
		);
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=200&height=200 200w",
		);
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=400&height=400 400w",
		);
	});

	it("should render the photo with alt_text", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						name: "Sara Carothers",
						description: "description",
						image: {
							alt_text: "alt text",
							url: "resized.jpg",
							auth: { 2: "12345" },
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		const image = screen.getByRole("img", { name: "alt text" });
		expect(image?.src).toBe(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=100&height=100",
		);
	});

	it("should render the photo without alt_text or an author name", () => {
		const content = {
			credits: {
				by: [
					{
						type: "author",
						description: "description",
						image: {
							url: "resized.jpg",
							auth: { 2: "12345" },
						},
						additional_properties: {
							original: {
								_id: "saracarothers",
								byline: "Sara Lynn Carothers",
								bio_page: "/author/sara-carothers/",
								bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
							},
						},
					},
				],
			},
		};
		render(<AuthorBioItems content={content} />);

		const image = screen.getByRole("img", { name: "" });
		expect(image?.src).toBe(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=100&height=100",
		);
	});
});
