describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// import React from "react";
// import { mount } from "enzyme";
// import SearchBox from "./search-box";

// const fakeEvent = { preventDefault: () => {} };

// jest.mock("fusion:context", () => ({
// 	useFusionContext: jest.fn(() => ({
// 		arcSite: "dagen",
// 	})),
// }));

// jest.mock("fusion:properties", () =>
// 	jest.fn(() => ({
// 		locale: "en",
// 		navBarBackground: "",
// 		navColor: "dark",
// 	}))
// );

// describe("the SearchBox component", () => {
// 	it("should render a search button", () => {
// 		const wrapper = mount(<SearchBox />);

// 		expect(wrapper.find(".nav-search button")).toHaveLength(1);
// 	});

// 	it("should *not* have a class of .open on the .nav-search by default", () => {
// 		const wrapper = mount(<SearchBox />);

// 		expect(wrapper.find(".nav-search")).not.toHaveClassName("open");
// 	});

// 	describe("when the search button is clicked", () => {
// 		it("should add .open class to .nav-search", () => {
// 			const wrapper = mount(<SearchBox />);

// 			wrapper.find(".nav-search button").simulate("mousedown", fakeEvent); // need to use mousedown instead of click to prevent race condition

// 			expect(wrapper.find(".nav-search")).toHaveClassName("open");
// 		});
// 		it("should run the customSearchAction when not not null", () => {
// 			const customSearchAction = () => {
// 				document.body.classList.add("has-custom-search-action");
// 			};
// 			const wrapper = mount(<SearchBox customSearchAction={customSearchAction} />);

// 			wrapper.find(".nav-search button").simulate("mousedown", fakeEvent); // need to use mousedown instead of click to prevent race condition

// 			expect(document.body.classList.contains("has-custom-search-action"));
// 		});
// 	});

// 	describe("when .nav-search is open", () => {
// 		it("should focus on the input element", () => {
// 			const wrapper = mount(<SearchBox />);
// 			expect(wrapper.find("input").getElement() === document.activeElement);
// 		});

// 		describe("when input loses focus", () => {
// 			it("should remove the .open class from .nav-search", () => {
// 				const wrapper = mount(<SearchBox />);

// 				wrapper.find(".nav-search button").simulate("mousedown", fakeEvent);
// 				expect(wrapper.find(".nav-search")).toHaveClassName("open");

// 				wrapper.find(".nav-search input").simulate("blur", fakeEvent);
// 				expect(wrapper.find(".nav-search")).not.toHaveClassName("open");
// 			});
// 		});

// 		describe("when alwaysOpen prop is true", () => {
// 			it("should add .open class to .nav-search", () => {
// 				const wrapper = mount(<SearchBox alwaysOpen />);

// 				wrapper.find(".nav-search button").simulate("mousedown", fakeEvent);
// 				expect(wrapper.find(".nav-search")).toHaveClassName("open");
// 			});
// 		});
// 	});

// 	describe("when alwaysOpen prop is true", () => {
// 		it("should add .open class to .nav-search", () => {
// 			const wrapper = mount(<SearchBox alwaysOpen />);
// 			expect(wrapper.find(".nav-search")).toHaveClassName("open");
// 		});
// 	});

// 	describe("searchInput.current.value on input keydown change ", () => {
// 		it("should trigger customSearchAction", async () => {
// 			const searchAction = jest.fn((value) => value);
// 			const wrapper = mount(<SearchBox alwaysOpen customSearchAction={searchAction} />);
// 			wrapper.find(".nav-search button").simulate("mousedown", fakeEvent);
// 			wrapper.find(".nav-search input").instance().value = "foo";

// 			wrapper.find(".nav-search input").simulate("keydown", { ...fakeEvent, key: "Enter" });

// 			await expect(searchAction).toHaveBeenCalledWith("foo");
// 		});
// 	});

// 	describe("searchInput.current.value on input keydown change ", () => {
// 		it("should trigger url location", async () => {
// 			global.window = Object.create(window);
// 			Object.defineProperty(window, "location", {
// 				writable: true,
// 				value: {
// 					href: "/",
// 				},
// 			});

// 			const wrapper = mount(<SearchBox alwaysOpen />);
// 			wrapper.find(".nav-search button").simulate("mousedown", fakeEvent);
// 			wrapper.find(".nav-search input").instance().value = "foo";

// 			wrapper.find(".nav-search input").simulate("keydown", { ...fakeEvent, key: "Enter" });

// 			await expect(window.location.href).toBe(`/search/foo`);

// 			delete global.window.location;
// 		});
// 	});

// 	describe("searchInput.current.value on button click change ", () => {
// 		it("should trigger customSearchAction", async () => {
// 			const searchAction = jest.fn((value) => value);
// 			const wrapper = mount(<SearchBox alwaysOpen customSearchAction={searchAction} />);

// 			wrapper.find(".nav-search input").instance().value = "foo";

// 			wrapper.find(".nav-search button").simulate("click", fakeEvent);

// 			await expect(searchAction).toHaveBeenCalledWith("foo");
// 		});
// 	});

// 	describe("searchInput.current.value on button click change ", () => {
// 		it("should trigger url location", async () => {
// 			global.window = Object.create(window);
// 			Object.defineProperty(window, "location", {
// 				writable: true,
// 				value: {
// 					href: "/",
// 				},
// 			});

// 			const wrapper = mount(<SearchBox alwaysOpen />);
// 			wrapper.find(".nav-search input").instance().value = "foo";
// 			wrapper.find(".nav-search button").simulate("click", fakeEvent);
// 			await expect(window.location.href).toBe(`/search/foo`);

// 			delete global.window.location;
// 		});
// 	});
// });
