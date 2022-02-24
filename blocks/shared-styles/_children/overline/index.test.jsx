import React from "react";
import { shallow, mount } from "enzyme";
import { useFusionContext } from "fusion:context";
import Overline from "./index";

const mockContextObj = {
	arcSite: "site",
	globalContent: {
		_id: "12345",
		websites: {
			site: {
				website_section: {
					_id: "/news",
					name: "News",
				},
			},
		},
	},
};

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input.toString()),
}));

jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockContextObj),
}));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: jest.fn(() => {}),
	})),
}));

describe("overline feature for default output type", () => {
	describe("when website_section content from globalContent is present", () => {
		it("should render an a", () => {
			const wrapper = mount(<Overline />);

			expect(wrapper.find("a")).toHaveClassName("overline");
		});

		it("should dangerously set the inner HTML to the website_section content", () => {
			const wrapper = mount(<Overline />);

			expect(wrapper.text()).toMatch("News");
		});

		it("should set a styled component class on the rendered a", () => {
			const wrapper = mount(<Overline />);

			expect(wrapper.find("a").hasClass(/sc-/)).toBe(true);
		});

		it("should render only text if label do not have url", () => {
			const mockStory = {
				arcSite: "site",
				globalContent: {
					_id: "123456",
					label: {
						basic: {
							display: true,
							text: "label",
						},
					},
					websites: {
						site: {
							website_section: {
								_id: "/mock/",
								name: "Mock",
							},
						},
					},
				},
			};
			useFusionContext.mockImplementation(() => mockStory);
			const wrapper = mount(<Overline />);

			expect(wrapper.find("span")).toHaveClassName("overline");
			expect(wrapper.find("span").text()).toEqual(mockStory.globalContent.label.basic.text);
		});
	});

	describe("when label content from globalContent is present", () => {
		describe("when label.basic.display is true", () => {
			beforeEach(() => {
				const labelObj = {
					label: {
						basic: { display: true, text: "EXCLUSIVE", url: "/exclusive" },
					},
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const wrapper = mount(<Overline />);

				expect(wrapper.text()).toMatch("EXCLUSIVE");
			});
		});

		describe("when label.basic.url is missing", () => {
			beforeEach(() => {
				const labelObj = {
					label: { basic: { display: true, text: "EXCLUSIVE" } },
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const wrapper = mount(<Overline />);

				expect(wrapper.text()).toMatch("EXCLUSIVE");
			});

			it("should render as text", () => {
				const wrapper = shallow(<Overline />);

				expect(wrapper.at(0).prop("className")).toEqual("overline");
				expect(wrapper.at(0).prop("href")).toBeFalsy();
			});
		});

		describe("when label.basic.url is empty", () => {
			beforeEach(() => {
				const labelObj = {
					label: { basic: { display: true, text: "EXCLUSIVE", url: "" } },
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should display the label name instead of the website section name", () => {
				const wrapper = mount(<Overline />);
				expect(wrapper.text()).toMatch("EXCLUSIVE");
			});

			it("should render as text", () => {
				const wrapper = shallow(<Overline />);

				expect(wrapper.at(0).prop("className")).toEqual("overline");
				expect(wrapper.at(0).prop("href")).toBeFalsy();
			});
		});

		describe("when label.basic.display is NOT true", () => {
			beforeEach(() => {
				const labelObj = {
					label: {
						basic: { display: false, text: "EXCLUSIVE", url: "/exclusive/" },
					},
				};
				const contextObjWithLabel = {
					...mockContextObj,
					globalContent: {
						...labelObj,
						...mockContextObj.globalContent,
					},
				};
				useFusionContext.mockImplementation(() => contextObjWithLabel);
			});

			it("should dangerously set the inner HTML to the website_section content", () => {
				const wrapper = mount(<Overline />);

				expect(wrapper.text()).toMatch("News");
			});
		});
	});

	describe("when headline content from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({}));
		});

		it("should not render anything", () => {
			const wrapper = mount(<Overline />);

			expect(wrapper).toBeEmptyRender();
		});
	});

	describe("when custom values are send throw param must be used instead of globalContent", () => {
		it("should render an anchor with correct values", () => {
			const wrapper = mount(<Overline customText="hello" customUrl="http://example.com" />);

			expect(wrapper.find("a")).toHaveClassName("overline");
			expect(wrapper.find("a").text()).toEqual("hello");
		});
	});

	describe("when a story is send throw param must be used instead of globalContent", () => {
		it("should render an anchor with correct values", () => {
			const mockStory = {
				_id: "123456",
				websites: {
					site: {
						website_section: {
							_id: "/mock/",
							name: "Mock",
						},
					},
				},
			};
			useFusionContext.mockImplementation(() => mockContextObj);
			const wrapper = mount(<Overline story={mockStory} />);

			expect(wrapper.find("a")).toHaveClassName("overline");
			expect(wrapper.find("a").text()).toEqual("Mock");
			expect(wrapper.find("a").prop("href")).toEqual("/mock/");
		});

		it("should render an anchor using the label values if exists", () => {
			const mockStory = {
				_id: "123456",
				label: {
					basic: {
						display: true,
						url: "http://label_url",
						text: "label",
					},
				},
				websites: {
					site: {
						website_section: {
							_id: "/mock/",
							name: "Mock",
						},
					},
				},
			};
			useFusionContext.mockImplementation(() => mockContextObj);
			const wrapper = mount(<Overline story={mockStory} />);

			expect(wrapper.find("a")).toHaveClassName("overline");
			expect(wrapper.find("a").text()).toEqual(mockStory.label.basic.text);
		});

		it("should render an anchor using the story values if label display is false", () => {
			const mockStory = {
				_id: "123456",
				label: {
					basic: {
						display: false,
						url: "http://label_url",
						text: "label",
					},
				},
				websites: {
					site: {
						website_section: {
							_id: "/mock/",
							name: "Mock",
						},
					},
				},
			};
			useFusionContext.mockImplementation(() => mockContextObj);
			const wrapper = mount(<Overline story={mockStory} />);

			expect(wrapper.find("a")).toHaveClassName("overline");
			expect(wrapper.find("a").text()).toEqual(mockStory.websites.site.website_section.name);
			expect(wrapper.find("a").prop("href")).toEqual(mockStory.websites.site.website_section._id);
		});
	});

	describe("use story object instead of global content", () => {
		const storyObject = {
			_id: "12345",
			websites: {
				site: {
					website_section: {
						_id: "/news",
						name: "Story Object",
					},
				},
			},
		};

		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({ arcSite: "site" }));
		});

		it("if story object is null renders nothing", () => {
			const wrapper = mount(<Overline story={null} />);

			expect(wrapper.html()).toBe(null);
		});

		it("should dangerously set the inner HTML to the website_section content", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.text()).toMatch("Story Object");
		});
	});

	describe("story object has owner.sponsored set to true", () => {
		const storyObject = {
			_id: "12345",
			owner: {
				sponsored: true,
			},
			websites: {
				site: {
					website_section: {
						_id: "/news",
						name: "Story Object",
					},
				},
			},
		};

		it("if story object is null renders nothing", () => {
			const wrapper = mount(<Overline story={null} />);

			expect(wrapper.html()).toBe(null);
		});

		it("set text to be Sponsored Content", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.text()).toMatch("Sponsored Content");
		});

		it("not be a link", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.find("span.overline").exists()).toBe(true);
		});
	});

	describe("override sponsored story with kicker label", () => {
		const storyObject = {
			_id: "12345",
			owner: {
				sponsored: true,
			},
			label: {
				basic: {
					text: "Custom label override",
				},
			},
			websites: {
				site: {
					website_section: {
						_id: "/news",
						name: "Story Object",
					},
				},
			},
		};

		it("if story object is null renders nothing", () => {
			const wrapper = mount(<Overline story={null} />);

			expect(wrapper.html()).toBe(null);
		});

		it("set text to be Sponsored Content", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.text()).toMatch(storyObject.label.basic.text);
		});

		it("not be a link", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.find("span.overline").exists()).toBe(true);
		});
	});

	describe("story object has owner.sponsored set to false", () => {
		const storyObject = {
			_id: "12345",
			owner: {
				sponsored: false,
			},
			websites: {
				site: {
					website_section: {
						_id: "/news",
						name: "Story Object",
					},
				},
			},
		};

		it("if story object is null renders nothing", () => {
			const wrapper = mount(<Overline story={null} />);

			expect(wrapper.html()).toBe(null);
		});

		it("set text be story object data", () => {
			const wrapper = mount(<Overline story={storyObject} />);

			expect(wrapper.text()).toMatch("Story Object");
		});
	});

	describe("allows for a className to be set", () => {
		const storyObject = {
			_id: "12345",
			owner: {
				sponsored: false,
			},
			websites: {
				site: {
					website_section: {
						_id: "/news",
						name: "Story Object",
					},
				},
			},
		};

		it("set custom class on Overline", () => {
			const wrapper = mount(<Overline story={storyObject} className="my-custom-class" />);

			expect(wrapper.find("a.my-custom-class").length).toBe(1);
		});
	});
});
