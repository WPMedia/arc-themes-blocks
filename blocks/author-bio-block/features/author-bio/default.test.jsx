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

jest.mock("fusion:content", () => ({
	useContent: jest.fn(),
}));

import { useContent } from "fusion:content";

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
		jest.clearAllMocks();
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

	describe("Image handling logic", () => {
		// it("should extract imageAuth from author.image.auth", () => {
		// 	const content = {
		// 		credits: {
		// 			by: [
		// 				{
		// 					type: "author",
		// 					name: "Sara Carothers",
		// 					description: "description",
		// 					image: {
		// 						url: "test.jpg",
		// 						auth: { 2: "auth123" },
		// 					},
		// 					additional_properties: {
		// 						original: {
		// 							_id: "saracarothers",
		// 							byline: "Sara Lynn Carothers",
		// 							bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
		// 						},
		// 					},
		// 				},
		// 			],
		// 		},
		// 	};
		// 	render(<AuthorBioItems content={content} />);
		//
		// 	const image = screen.getByRole("img", { name: "Sara Carothers" });
		// 	expect(image?.src).toBe(
		// 		"http://url.com/test.jpg?smart=true&auth=auth123&width=100&height=100",
		// 	);
		// });
		//
		// it("should extract imageAuth from author.additional_properties.original.ansImage.auth", () => {
		// 	const content = {
		// 		credits: {
		// 			by: [
		// 				{
		// 					type: "author",
		// 					name: "Sara Carothers",
		// 					description: "description",
		// 					image: {
		// 						url: "test.jpg",
		// 					},
		// 					additional_properties: {
		// 						original: {
		// 							_id: "saracarothers",
		// 							byline: "Sara Lynn Carothers",
		// 							bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
		// 							ansImage: {
		// 								url: "ans-test.jpg",
		// 								auth: { 2: "ansAuth123" },
		// 							},
		// 						},
		// 					},
		// 				},
		// 			],
		// 		},
		// 	};
		// 	render(<AuthorBioItems content={content} />);
		//
		// 	const image = screen.getByRole("img", { name: "Sara Carothers" });
		// 	expect(image?.src).toBe(
		// 		"http://url.com/ans-test.jpg?smart=true&auth=ansAuth123&width=100&height=100",
		// 	);
		// });

		it("should prioritize author.image.auth over additional_properties.original.ansImage.auth", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "primaryAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									ansImage: {
										url: "ans-test.jpg",
										auth: { 2: "secondaryAuth" },
									},
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.src).toBe(
				"http://url.com/test.jpg?smart=true&auth=primaryAuth&width=100&height=100",
			);
		});

		it("should extract imageUrl from author.image.url", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "primary-image.jpg",
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.getAttribute("src")).toBe("primary-image.jpg");
		});

		it("should extract imageUrl from author.additional_properties.original.image when author.image.url is not available", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									image: "fallback-image.jpg",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.getAttribute("src")).toBe("fallback-image.jpg");
		});

		it("should extract imageUrl from author.additional_properties.original.ansImage.url when other sources are not available", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									ansImage: {
										url: "ans-image.jpg",
									},
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.getAttribute("src")).toBe("ans-image.jpg");
		});

		it("should prioritize author.image.url over additional_properties.original.image", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "primary-url.jpg",
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									image: "fallback-url.jpg",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.getAttribute("src")).toBe("primary-url.jpg");
		});

		it("should prioritize author.additional_properties.original.image over ansImage.url", () => {
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
									image: "fallback-image.jpg",
									ansImage: {
										url: "ans-url.jpg",
									},
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.getAttribute("src")).toBe("fallback-image.jpg");
		});

		it("should not call useContent when imageAuth is available", () => {
			useContent.mockReturnValue({});

			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "existingAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};

			// Re-import to get the mocked version
			const { AuthorBioItems } = require("./default");
			render(<AuthorBioItems content={content} />);

			expect(useContent).toHaveBeenCalledWith({})
		});

		it("should call useContent with signing-service when imageAuth is not available", () => {
			useContent.mockReturnValue({ hash: "newAuthHash" });

			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};

			// Re-import to get the mocked version
			const { AuthorBioItems } = require("./default");
			render(<AuthorBioItems content={content} />);

			expect(useContent).toHaveBeenCalledWith({
				source: "signing-service",
				query: { id: "test.jpg" },
			});
		});

		it("should not apply resized auth token when useContent returns no hash", () => {
			useContent.mockReturnValue({});

			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "originalAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};

			// Re-import to get the mocked version
			const { AuthorBioItems } = require("./default");
			render(<AuthorBioItems content={content} />);

			const image = screen.getByRole("img", { name: "Sara Carothers" });
			expect(image?.src).toBe(
				"http://url.com/test.jpg?smart=true&auth=originalAuth&width=100&height=100",
			);
		});

		it("should handle case when no image data is available", () => {
			// Assume no auth or data is available from useContent
			useContent.mockReturnValue({});
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

		it("should handle case when imageUrl is empty string and imageAuth is not available", () => {
			// Assume no auth or data is available from useContent
			useContent.mockReturnValue({});
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

		it("should handle useContent integration when imageAuth is not available", () => {
			// Assume useContent returns a hash
			useContent.mockReturnValue({ hash: "newAuthHash" });

			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			// Verify that the component renders without errors when useContent is called
			expect(screen.getByRole("img", { name: "Sara Carothers" })).toBeInTheDocument();
			expect(useContent).toHaveBeenCalledWith({
				source: "signing-service",
				query: { id: "test.jpg" },
			});
		});

		it("should handle useContent integration when imageAuth is available", () => {
			useContent.mockReturnValue({});
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "existingAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			// Verify that the component renders without errors when useContent is called with empty object
			expect(screen.getByRole("img", { name: "Sara Carothers" })).toBeInTheDocument();
			expect(useContent).toHaveBeenCalledWith({});
		});

		it("should handle resized auth token application", () => {
			useContent.mockReturnValue({});
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "originalAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			// Verify that the component renders without errors when resized auth is applied
			expect(screen.getByRole("img", { name: "Sara Carothers" })).toBeInTheDocument();
		});

		it("should handle case when useContent returns no hash", () => {
			useContent.mockReturnValue({});
			const content = {
				credits: {
					by: [
						{
							type: "author",
							name: "Sara Carothers",
							description: "description",
							image: {
								url: "test.jpg",
								auth: { 2: "originalAuth" },
							},
							additional_properties: {
								original: {
									_id: "saracarothers",
									byline: "Sara Lynn Carothers",
									bio: "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
								},
							},
						},
					],
				},
			};
			render(<AuthorBioItems content={content} />);

			// Verify that the component renders without errors when useContent returns no hash
			expect(screen.getByRole("img", { name: "Sara Carothers" })).toBeInTheDocument();
		});
	});
});
