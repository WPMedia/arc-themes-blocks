// import React from "react";
// import { shallow } from "enzyme";
//
// describe("Given Overline Block", () => {
// 	it("should return an Overline element", () => {
// 		const { default: Overline } = require("./default");
// 		const wrapper = shallow(<Overline />);
// 		expect(wrapper.find("Overline").length).toEqual(1);
// 	});
// });

import React from "react";
import { useFusionContext } from "fusion:context";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Overline from "./default";

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

jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:themes", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => mockContextObj),
}));

jest.mock("fusion:content", () => ({
	useEditableContent: jest.fn(() => ({
		editableContent: jest.fn(() => {}),
	})),
}));

describe("overline feature for default output type", () => {
	describe("when website_section content from globalContent is present", () => {
		it("should render an a", () => {
			const { container } = render(<Overline />);
			expect(container.querySelectorAll("a")).toHaveLength(1);
		});

		it("should dangerously set the inner HTML to the website_section content", () => {
			const { container } = render(<Overline />);
			expect(container.querySelector("a").textContent).toContain("News");
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
			const { container } = render(<Overline />);
			expect(container.querySelector("span").textContent).toContain(
				mockStory.globalContent.label.basic.text
			);
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
				const { container } = render(<Overline />);
				expect(container.querySelector("a").textContent).toContain("EXCLUSIVE");
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
				const { container } = render(<Overline />);
				expect(container.querySelector("span").textContent).toContain("EXCLUSIVE");
			});

			it("should render as text", () => {
				const { container } = render(<Overline />);
				expect(container.querySelectorAll("span")).toHaveLength(1);
				expect(container.querySelectorAll("a")).toHaveLength(0);
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
				const { container } = render(<Overline />);
				expect(container.querySelector("span").textContent).toContain("EXCLUSIVE");
			});

			it("should render as text", () => {
				const { container } = render(<Overline />);
				expect(container.querySelectorAll("span")).toHaveLength(1);
				expect(container.querySelectorAll("a")).toHaveLength(0);
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
				const { container } = render(<Overline />);
				expect(container.querySelector("a").textContent).toContain("News");
			});
		});
	});

	describe("when headline content from globalContent is NOT present", () => {
		beforeEach(() => {
			useFusionContext.mockImplementation(() => ({}));
		});

		it("should not render anything", () => {
			const { container } = render(<Overline />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});
	});

	describe("when custom values are send throw param must be used instead of globalContent", () => {
		it("should render an anchor with correct values", () => {
			const { container } = render(<Overline customText="hello" customUrl="http://example.com" />);
			expect(container.querySelector("a").textContent).toContain("hello");
			expect(container.querySelector("a").href).toContain("http://example.com");
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
			const { container } = render(<Overline story={mockStory} />);
			expect(container.querySelector("a").textContent).toContain("Mock");
			expect(container.querySelector("a").href).toContain("/mock/");
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
			const { container } = render(<Overline story={mockStory} />);
			expect(container.querySelector("a").textContent).toContain(mockStory.label.basic.text);
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
			const { container } = render(<Overline story={mockStory} />);
			expect(container.querySelector("a").textContent).toContain(
				mockStory.websites.site.website_section.name
			);
			expect(container.querySelector("a").href).toContain(
				mockStory.websites.site.website_section._id
			);
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
			const { container } = render(<Overline story={null} />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});

		it("should dangerously set the inner HTML to the website_section content", () => {
			const { container } = render(<Overline story={storyObject} />);
			expect(container.querySelector("a").textContent).toContain("Story Object");
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
			const { container } = render(<Overline story={null} />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});

		it("not be a link", () => {
			const { container } = render(<Overline story={storyObject} />);
			expect(container.querySelectorAll("span")).toHaveLength(1);
			expect(container.querySelectorAll("a")).toHaveLength(0);
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
			const { container } = render(<Overline story={null} />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});

		it("set text to be Sponsored Content", () => {
			const { container } = render(<Overline story={storyObject} />);
			expect(container.querySelector("span").textContent).toContain(storyObject.label.basic.text);
		});

		it("not be a link", () => {
			const { container } = render(<Overline story={storyObject} />);
			expect(container.querySelectorAll("span")).toHaveLength(1);
			expect(container.querySelectorAll("a")).toHaveLength(0);
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
			const { container } = render(<Overline story={null} />);
			expect(container.querySelectorAll("span")).toHaveLength(0);
			expect(container.querySelectorAll("a")).toHaveLength(0);
		});

		it("set text be story object data", () => {
			const { container } = render(<Overline story={storyObject} />);
			expect(container.querySelector("a").textContent).toContain("Story Object");
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
			const { container } = render(<Overline story={storyObject} className="my-custom-class" />);
			expect(container.querySelectorAll("a.my-custom-class")).toHaveLength(1);
		});
	});
});
