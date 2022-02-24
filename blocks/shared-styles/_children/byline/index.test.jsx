const React = require("react");
const { mount } = require("enzyme");

jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		arcSite: "the-sun",
	})),
}));

describe("Given a single author", () => {
	it("should use additional_properties byline if it exists", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
								additional_properties: {
									original: {
										byline: "SangHee Kim Byline",
									},
								},
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).prop("dangerouslySetInnerHTML")).toStrictEqual({
			__html: ' <a href="/author/sanghee-kim">SangHee Kim Byline</a>',
		});
	});

	it("should fallback to author name if additional_properties doesn't exist", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).prop("dangerouslySetInnerHTML")).toStrictEqual({
			__html: ' <a href="/author/sanghee-kim">SangHee Kim</a>',
		});
	});

	it('should return nothing if type is not "author"', () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "other",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").length).toBe(0);
	});

	it("should return nothing if name is missing", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "",
								url: "/author/sanghee-kim",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").length).toBe(0);
	});

	it("should not be a link if url is missing", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).find("a").length).toBe(0);
		expect(wrapper.find("span").at(1).text().trim()).toEqual("SangHee Kim");
	});

	it("should not be a link if url is missing #2", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).find("a").length).toBe(0);
		expect(wrapper.find("span").at(1).text().trim()).toEqual("SangHee Kim");
	});

	it("should not be a link if url is missing #3", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "",
								additional_properties: {
									original: {
										byline: "SangHee Kim Byline",
									},
								},
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).find("a").length).toBe(0);
		expect(wrapper.find("span").at(1).text().trim()).toEqual("SangHee Kim Byline");
	});
});

describe("Given an author list", () => {
	it("should return two authors", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
							},
							{
								type: "author",
								name: "Sara Carothers",
								url: "/author/sara-carothers",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).prop("dangerouslySetInnerHTML")).toStrictEqual({
			__html:
				' <a href="/author/sanghee-kim">SangHee Kim</a> and <a href="/author/sara-carothers">Sara Carothers</a>',
		});
	});

	it("should return three authors, oxford comma", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
							},
							{
								type: "author",
								name: "Joe Grosspietsch",
								url: "/author/joe-grosspietsch",
							},
							{
								type: "author",
								name: "Brent Miller",
								url: "/author/brent-miller",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).prop("dangerouslySetInnerHTML")).toStrictEqual({
			__html:
				' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a> and <a href="/author/brent-miller">Brent Miller</a>',
		});
	});

	it("should return four authors, oxford comma", () => {
		const { default: Byline } = require("./index");
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
							},
							{
								type: "author",
								name: "Joe Grosspietsch",
								url: "/author/joe-grosspietsch",
							},
							{
								type: "author",
								name: "Brent Miller",
								url: "/author/brent-miller",
							},
							{
								type: "author",
								name: "Sara Carothers",
								url: "/author/sara-carothers",
							},
						],
					},
				},
			})),
		}));

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).prop("dangerouslySetInnerHTML")).toStrictEqual({
			__html:
				' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a>, <a href="/author/brent-miller">Brent Miller</a> and <a href="/author/sara-carothers">Sara Carothers</a>',
		});
	});

	it("should return 4 authors complete with url and bylines", () => {
		const { default: Byline } = require("./index");

		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({
				globalContent: {
					credits: {
						by: [
							{
								type: "author",
								name: "SangHee Kim",
								url: "/author/sanghee-kim",
								additional_properties: {
									original: {
										byline: "SangHee Kim Byline",
									},
								},
							},
							{
								type: "author",
								name: "Joe Grosspietsch",
								url: "/author/joe-grosspietsch",
								additional_properties: {
									original: {
										byline: "Joe Grosspietsch Byline",
									},
								},
							},
							{
								type: "author",
								name: "Brent Miller",
								url: "/author/brent-miller",
								additional_properties: {
									original: {
										byline: "Brent Miller Byline",
									},
								},
							},
							{
								type: "author",
								name: "Sara Carothers",
								url: "/author/sara-carothers",
								additional_properties: {
									original: {
										byline: "Sara Lynn Carothers",
									},
								},
							},
							{
								type: "other",
								name: "John Doe",
								url: "/author/john-doe",
								additional_properties: {
									original: {
										byline: "John Doe",
									},
								},
							},
						],
					},
				},
			})),
		}));

		const creditCheck = [
			{
				href: "/author/sanghee-kim",
				text: "SangHee Kim Byline",
			},
			{
				href: "/author/joe-grosspietsch",
				text: "Joe Grosspietsch Byline",
			},
			{
				href: "/author/brent-miller",
				text: "Brent Miller Byline",
			},
			{
				href: "/author/sara-carothers",
				text: "Sara Lynn Carothers",
			},
			{
				href: "/author/john-doe",
				text: "John Doe",
			},
		];

		const wrapper = mount(<Byline />);
		expect(wrapper.find("span").at(1).text().trim()).toEqual(
			"SangHee Kim Byline, Joe Grosspietsch Byline, Brent Miller Byline and Sara Lynn Carothers"
		);

		wrapper
			.find("span")
			.at(1)
			.find("a")
			.forEach((anchor, idx) => {
				expect(anchor.prop("href")).toEqual(creditCheck[idx].href);
				expect(anchor.text()).toEqual(creditCheck[idx].text);
			});
	});

	it("should not throw by undefined error if empty global content object", () => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({ globalContent: {} })),
		}));
		const { default: Byline } = require("./index");

		expect(() => {
			mount(<Byline />);
		}).not.toThrow(TypeError("Cannot read property 'credits' of undefined"));
	});

	it("should return null if no authors found", () => {
		jest.mock("fusion:context", () => ({
			useFusionContext: jest.fn(() => ({ globalContent: {} })),
		}));
		const { default: Byline } = require("./index");

		const wrapper = mount(<Byline />);
		expect(wrapper).toBeEmptyRender();
	});
});
