import React from "react";
import { mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import FullAuthorBio from "./default";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		fallbackImage: "placeholder.jpg",
		resizerURL: "resizer",
	}))
);

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	Image: () => <div />,
	EnvelopeIcon: () => <svg>EnvelopeIcon</svg>,
	LinkedInIcon: () => <svg>LinkedInIcon</svg>,
	InstagramIcon: () => <svg>InstagramIcon</svg>,
	TwitterIcon: () => <svg>TwitterIcon</svg>,
	FacebookIcon: () => <svg>FacebookIcon</svg>,
	RedditIcon: () => <svg>RedditIcon</svg>,
	YoutubeIcon: () => <svg>YoutubeIcon</svg>,
	MediumIcon: () => <svg>MediumIcon</svg>,
	TumblrIcon: () => <svg>TumblrIcon</svg>,
	PinterestIcon: () => <svg>PinterestIcon</svg>,
	SnapchatIcon: () => <svg>SnapchatIcon</svg>,
	WhatsAppIcon: () => <svg>WhatsAppIcon</svg>,
	SoundCloudIcon: () => <svg>SoundCloudIcon</svg>,
	RssIcon: () => <svg>RssIcon</svg>,
	LazyLoad: ({ children }) => <>{children}</>,
	isServerSide: () => true,
	constructSocialURL: (type, field) => field,
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

describe("Full author bio block", () => {
	describe("lazy load and isAdmin", () => {
		it("should return null if lazyLoad on the server and not in the admin", () => {
			const wrapper = mount(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(wrapper.html()).toBe(null);
		});

		it("should not return null if lazyLoad on the server and isAdmin", () => {
			useFusionContext.mockImplementation(() => ({
				isAdmin: true,
				globalContent: {
					authors: [
						{
							_id: "janedoe",
							firstName: "Jane",
						},
					],
				},
			}));
			const wrapper = mount(<FullAuthorBio customFields={{ lazyLoad: true }} />);
			expect(wrapper.html()).not.toBe(null);
		});
	});

	describe("when fields from globalContent are present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "no-site",
				globalContent: {
					authors: [
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
							longBio:
								"Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
							instagram: "janedoe",
						},
					],
				},
			}));
		});

		it("should render a h1", () => {
			const wrapper = mount(<FullAuthorBio />);

			expect(wrapper.find("h1")).toHaveClassName("author-name");
		});

		it("should render a h4", () => {
			const wrapper = mount(<FullAuthorBio />);

			expect(wrapper.find("h2")).toHaveClassName("author-title");
		});

		it("should render a p", () => {
			const wrapper = mount(<FullAuthorBio />);
			expect(wrapper.find(".author-bio").first().text()).toMatch("She works on Arc Themes");
		});

		it("should render a photo", () => {
			const wrapper = mount(<FullAuthorBio />);

			expect(wrapper.find("Image").props().src === "").toEqual(false);
		});
	});

	describe("when there is no long bio", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "no-site",
				globalContent: {
					authors: [
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
							bio: "Jane Doe is a senior product manager for Arc Publishing. This is a short bio. ",
							instagram: "janedoe",
						},
					],
				},
			}));
		});

		it("should render a short bio", () => {
			const wrapper = mount(<FullAuthorBio />);
			expect(wrapper.find(".author-bio").first().text()).toMatch("short bio");
		});
	});

	describe("when there is only a long bio", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({
				arcSite: "no-site",
				globalContent: {
					authors: [
						{
							_id: "janedoe",
							firstName: "Jane",
							lastName: "Doe",
							role: "Senior Product Manager",
							image:
								"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
							resized_params: { "158x158": "" },
							email: "jane@doe.com",
							facebook: "https://facebook.com/janedoe",
							rss: "somersslink",
							twitter: "janedoe",
							longBio:
								"Jane Doe is a senior product manager for Arc Publishing. This is a Long bio. ",
							instagram: "janedoe",
						},
					],
				},
			}));
		});

		it("should render a short bio", () => {
			const wrapper = mount(<FullAuthorBio />);
			expect(wrapper.find(".author-bio").first().text()).toMatch("Long bio");
		});
	});

	describe("the social media icons", () => {
		describe("when the twitter link is present", () => {
			it("should render a twitter icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".twitter")).toHaveLength(1);
			});
		});

		describe("when the instagram link is present", () => {
			it("should render an instagram icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".instagram")).toHaveLength(1);
			});
		});

		describe("when the facebook link is present", () => {
			it("should render a facebook icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".facebook")).toHaveLength(1);
			});
		});

		describe("when the email link is present", () => {
			it("should render an email icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".email")).toHaveLength(1);
			});
		});

		describe("when the RSS link is present", () => {
			it("should render a RSS icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".rss")).toHaveLength(1);
			});
			it("should render noreferrer and new tab with link", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".rss").props().rel).toEqual("noopener noreferrer");
				expect(wrapper.find(".rss").props().target).toEqual("_blank");
			});
		});

		describe("when the twitter link is not present", () => {
			beforeEach(() => {
				useFusionContext.mockImplementation(() => ({
					arcSite: "no-site",
					globalContent: {},
				}));
			});
			it("should not render a twitter icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".twitter")).toHaveLength(0);
			});
		});

		describe("when the instagram link is not present", () => {
			it("should not render an instagram icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".instagram")).toHaveLength(0);
			});
		});

		describe("when the facebook link is not present", () => {
			it("should not render a facebook icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".facebook")).toHaveLength(0);
			});
		});

		describe("when the email link is not present", () => {
			it("should not render an email icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".email")).toHaveLength(0);
			});
		});

		describe("when the RSS link is not present", () => {
			it("should not render a RSS icon", () => {
				const wrapper = mount(<FullAuthorBio />);

				expect(wrapper.find(".rss")).toHaveLength(0);
			});
		});
	});

	describe("when the fields from globalContent are NOT present", () => {
		it("should NOT render anything", () => {
			const wrapper = mount(<FullAuthorBio />);

			expect(wrapper).toBeEmptyRender();
		});
	});

	describe("when there are no authors", () => {
		it("should NOT render anything", () => {
			const wrapper = mount(<FullAuthorBio />);

			expect(wrapper).toBeEmptyRender();
		});
	});
});

describe("when there are falsy values as social media links", () => {
	it("should not render null value", () => {
		useFusionContext.mockImplementation(() => ({
			arcSite: "no-site",
			globalContent: {
				authors: [
					{
						twitter: null,
						instagram: "yay",
						_id: "janedoe",
					},
				],
			},
		}));
		const wrapper = mount(<FullAuthorBio />);
		expect(wrapper.find(".twitter")).toHaveLength(0);
		expect(wrapper.find(".instagram")).toHaveLength(1);
	});

	it("should not render empty string value", () => {
		useFusionContext.mockImplementation(() => ({
			arcSite: "no-site",
			globalContent: {
				authors: [
					{
						twitter: "",
						instagram: "yay",
						_id: "janedoe",
					},
				],
			},
		}));
		const wrapper = mount(<FullAuthorBio />);
		expect(wrapper.find(".twitter")).toHaveLength(0);
		expect(wrapper.find(".instagram")).toHaveLength(1);
	});

	it("should not render if no key social value", () => {
		useFusionContext.mockImplementation(() => ({
			arcSite: "no-site",
			globalContent: {
				authors: [
					{
						instagram: "yay",
						_id: "janedoe",
					},
				],
			},
		}));
		const wrapper = mount(<FullAuthorBio />);
		expect(wrapper.find(".twitter")).toHaveLength(0);
		expect(wrapper.find(".instagram")).toHaveLength(1);
		expect(wrapper.find(".social-container")).toHaveLength(1);
	});

	it("should not render social elements when no socials", () => {
		useFusionContext.mockImplementation(() => ({
			arcSite: "no-site",
			globalContent: {
				authors: [
					{
						_id: "janedoe",
					},
					{
						_id: "janedoes",
					},
				],
			},
		}));
		const wrapper = mount(<FullAuthorBio />);
		expect(wrapper.find(".twitter")).toHaveLength(0);
		expect(wrapper.find(".instagram")).toHaveLength(0);
		expect(wrapper.find(".social-container")).toHaveLength(0);
	});
});
