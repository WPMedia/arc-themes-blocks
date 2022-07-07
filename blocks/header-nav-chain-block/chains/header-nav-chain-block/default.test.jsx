import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import Navigation from "./default";
import { DEFAULT_SELECTIONS, PLACEMENT_AREAS } from "./nav-helper";

jest.mock(
	"focus-trap-react",
	() =>
		({ children }) =>
			children
);
jest.mock("fusion:properties", () => jest.fn(() => ({})));
jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		contextPath: "pf",
		deployment: jest.fn(() => ({})).mockReturnValue("path/image.svg"),
	})),
}));
jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
}));

describe("the header navigation feature for the default output type", () => {
	describe("horizontal links bar", () => {
		it('should render horizontal links when "logoAlignment" is "left"', () => {
			const cFields = {
				...DEFAULT_SELECTIONS,
				logoAlignment: "left",
				horizontalLinksHierarchy: "default",
			};
			const wrapper = mount(<Navigation customFields={cFields} />);
			const navBar = wrapper.find(".b-header-nav-chain");
			const linksBar = navBar.find("HorizontalLinksBar");
			expect(linksBar).toHaveLength(1);
			expect(linksBar.prop("hierarchy")).toEqual(cFields.horizontalLinksHierarchy);
		});

		it('should not render horizontal links when "logoAlignment" is "center"', () => {
			const cFields = {
				...DEFAULT_SELECTIONS,
				logoAlignment: "center",
				horizontalLinksHierarchy: "default",
			};
			const wrapper = mount(<Navigation customFields={cFields} />);
			const navBar = wrapper.find(".b-header-nav-chain");
			expect(navBar.find("HorizontalLinksBar")).toHaveLength(0);
		});
	});

	describe("navigation bar widgets/buttons", () => {
		describe("nav-bar default configuration", () => {
			it("should render search and sections menu in the top-left navbar on desktop", () => {
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navLeftDesktop = wrapper.find(
					".b-header-nav-chain__nav-left > .nav-components--desktop"
				);
				expect(navLeftDesktop).toHaveLength(1);
				const searchWidget = navLeftDesktop.find(".nav-search");
				expect(searchWidget).toHaveLength(1);
				const menuWidget = navLeftDesktop.find(".menu-btn button");
				expect(menuWidget).toHaveLength(1);
			});

			it("should render sections menu in the top-left navbar on mobile", () => {
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navLeftDesktop = wrapper.find(
					".b-header-nav-chain__nav-left > .nav-components--mobile"
				);
				expect(navLeftDesktop).toHaveLength(1);
				const menuWidget = navLeftDesktop.find(".menu-btn button");
				expect(menuWidget).toHaveLength(1);
			});

			it("should render nothing inside the .nav-right on desktop", () => {
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const widgetList = wrapper.find(
					".b-header-nav-chain__nav-right > .nav-components--desktop > WidgetList"
				);
				expect(widgetList).toHaveLength(1);
				expect(widgetList.children()).toHaveLength(0);
			});

			it("should render nothing inside the .nav-right on mobile", () => {
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const widgetList = wrapper.find(
					".b-header-nav-chain__nav-right > .nav-components--mobile > WidgetList"
				);
				expect(widgetList).toHaveLength(1);
				expect(widgetList.children()).toHaveLength(0);
			});
		});
	});

	describe("sections menu widgets/buttons", () => {
		describe("sections menu custom configuration", () => {
			const testSectionMenuWidget = (customFields, breakpoint) => {
				const TestComponent = jest.fn(() => <div id="test-component" />);
				const wrapper = mount(
					<Navigation customFields={customFields}>
						<TestComponent />
					</Navigation>
				);
				const container = wrapper.find("#flyout-overlay .nav-menu");
				const widgetList = container.find(`.nav-components--${breakpoint} > WidgetList`);
				expect(widgetList).toHaveLength(1);
				return widgetList.find("NavWidget");
			};

			it("should render custom widget on mobile", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentMobile1: "custom",
					menuComponentCustomIndexMobile1: 1,
				};
				const navWidget = testSectionMenuWidget(CUSTOM_SELECTIONS, "mobile");
				expect(navWidget).toHaveLength(1);
				expect(navWidget.prop("type")).toEqual("custom");
				expect(navWidget.prop("position")).toEqual(1);
				expect(navWidget.prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
			});
			it("should render custom widget on desktop", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentDesktop1: "custom",
					menuComponentCustomIndexDesktop1: 1,
				};
				const navWidget = testSectionMenuWidget(CUSTOM_SELECTIONS, "desktop");
				expect(navWidget).toHaveLength(1);
				expect(navWidget.prop("type")).toEqual("custom");
				expect(navWidget.prop("position")).toEqual(1);
				expect(navWidget.prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
			});
			it("should render two widgets on mobile", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentMobile1: "search",
					menuComponentMobile2: "custom",
					menuComponentCustomIndexMobile2: 1,
				};
				const navWidgets = testSectionMenuWidget(CUSTOM_SELECTIONS, "mobile");
				expect(navWidgets).toHaveLength(2);
				expect(navWidgets.at(0).prop("type")).toEqual("search");
				expect(navWidgets.at(0).prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
				expect(navWidgets.at(1).prop("type")).toEqual("custom");
				expect(navWidgets.at(1).prop("position")).toEqual(1);
				expect(navWidgets.at(1).prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
			});
			it("should render two widgets on desktop", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentDesktop1: "custom",
					menuComponentCustomIndexDesktop1: 1,
					menuComponentDesktop2: "search",
				};
				const navWidgets = testSectionMenuWidget(CUSTOM_SELECTIONS, "desktop");
				expect(navWidgets).toHaveLength(2);
				expect(navWidgets.at(0).prop("type")).toEqual("custom");
				expect(navWidgets.at(0).prop("position")).toEqual(1);
				expect(navWidgets.at(0).prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
				expect(navWidgets.at(1).prop("type")).toEqual("search");
				expect(navWidgets.at(1).prop("placement")).toEqual(PLACEMENT_AREAS.SECTION_MENU);
			});
		});
	});

	describe("the navigation bar logo auto hide/show behavior", () => {
		describe("when the page has a masthead-block", () => {
			it("should hide the logo on the initial render", () => {
				getProperties.mockImplementation(() => ({}));
				const wrapper = mount(
					<>
						<Navigation customFields={DEFAULT_SELECTIONS} />
						<div className="b-masthead" />
					</>
				);

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-hidden").hostNodes().length).toBe(
					1
				);
			});

			it("should show the logo after 1 second if there is not a masthead", () => {
				jest.useFakeTimers();
				getProperties.mockImplementation(() => ({}));
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
					wrapper.setProps({});
				});

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-show").hostNodes().length).toBe(1);
			});

			it("should show the logo after 1 second on mobile devices", () => {
				jest.useFakeTimers();
				// we need to fake medium breakpoint because jest can't spy on innerWidth yet
				getProperties.mockImplementation(() => ({
					breakpoints: { small: 0, medium: 1500, large: 2000 },
				}));
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
					wrapper.setProps({});
				});

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-show").hostNodes().length).toBe(1);
			});

			it("should show the logo after 1 second if there is a masthead but no logo", () => {
				jest.useFakeTimers();
				getProperties.mockImplementation(() => ({}));
				const spy = jest
					.spyOn(document, "querySelector")
					.mockImplementation((selector) =>
						selector === ".b-masthead .b-masthead__logo" ? undefined : {}
					);
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
					wrapper.setProps({});
				});

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-show").hostNodes().length).toBe(1);
				spy.mockRestore();
			});

			it("should not show the logo after 1 second if there is a masthead and logo", () => {
				jest.useFakeTimers();
				getProperties.mockImplementation(() => ({}));
				const spy = jest
					.spyOn(document, "querySelector")
					.mockImplementation((selector) =>
						selector === ".b-masthead .b-masthead__logo" ? {} : undefined
					);

				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
					wrapper.setProps({});
				});

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-hidden").hostNodes().length).toBe(
					1
				);
				spy.mockRestore();
			});

			it("should setup scroll handlers, when enable logo", () => {
				let handlerSetup = false;
				const spy = jest.spyOn(window, "addEventListener").mockImplementation((...args) => {
					if (args[0] === "scroll") {
						handlerSetup = true;
					}
					return undefined;
				});
				const spy2 = jest
					.spyOn(document, "querySelector")
					.mockImplementation((selector) =>
						selector === ".b-masthead .b-masthead__logo" ? { data: true } : undefined
					);
				getProperties.mockImplementation(() => ({}));
				jest.useFakeTimers();
				const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
					wrapper.setProps({});
				});

				expect(wrapper.find(".b-header-nav-chain__logo.nav-logo-hidden").hostNodes().length).toBe(
					1
				);
				expect(handlerSetup).toBeTruthy();

				spy.mockRestore();
				spy2.mockRestore();
			});
		});
	});

	describe("hamburger menu", () => {
		it("opens and closes with the sections button", () => {
			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(true);

			wrapper
				.find(".b-header-nav-chain__nav-left > .nav-components--desktop .menu-btn")
				.hostNodes()
				.simulate("click");
			expect(wrapper.find("div#flyout-overlay").hasClass("open")).toBe(true);

			wrapper
				.find(".b-header-nav-chain__nav-left > .nav-components--desktop .menu-btn")
				.hostNodes()
				.simulate("click");
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(true);
		});

		it("open with section button, closes when click the container", () => {
			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(true);

			wrapper
				.find(".b-header-nav-chain__nav-left > .nav-components--desktop .menu-btn")
				.hostNodes()
				.simulate("click");
			expect(wrapper.find("div#flyout-overlay").hasClass("open")).toBe(true);

			wrapper.find("div#flyout-overlay").simulate("click", { target: { closest: () => false } });
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(true);
		});

		it("open with section button, must not close when inside the drawer", () => {
			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(true);

			wrapper
				.find(".b-header-nav-chain__nav-left > .nav-components--desktop .menu-btn")
				.hostNodes()
				.simulate("click");
			expect(wrapper.find("div#flyout-overlay").hasClass("open")).toBe(true);

			wrapper.find("div#flyout-overlay").simulate("click", { target: { closest: () => true } });
			expect(wrapper.find("div#flyout-overlay").hasClass("closed")).toBe(false);
		});
	});

	describe("dealing with accessibility and screen readers", () => {
		it("should render the block with the default aria-label", () => {
			const wrapper = mount(<Navigation customFields={{}} />);
			expect(wrapper.find("nav#main-nav").props()).toHaveProperty(
				"aria-label",
				"header-nav-chain-block.sections-element-aria-label"
			);
		});

		it("should render the block with the custom aria-label", () => {
			const wrapper = mount(<Navigation customFields={{ ariaLabel: "Links" }} />);
			expect(wrapper.find("nav#main-nav").props()).toHaveProperty("aria-label", "Links");
		});
	});

	describe("primary image", () => {
		it("shown without deployment function prefix if external http url", () => {
			getProperties.mockReturnValueOnce({
				primaryLogo: "http://www.example.com/logo.png",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});

			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);

			const navLogoImg = wrapper.find(".b-header-nav-chain__logo img");
			expect(navLogoImg).toHaveLength(1);
			expect(navLogoImg.prop("src")).toEqual("http://www.example.com/logo.png");
		});

		it("shows image rendered from depoyment function if no http or base64 found", () => {
			getProperties.mockReturnValueOnce({
				primaryLogo: "resources/images/logo.png",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});
			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);

			const navLogoImg = wrapper.find(".b-header-nav-chain__logo img");
			expect(navLogoImg).toHaveLength(1);
			expect(navLogoImg.prop("src")).toEqual("rendered-from-deployment");
		});

		it("shows image with deployment function used with base64", () => {
			getProperties.mockReturnValueOnce({
				primaryLogo: "base64, iVBORw0KGgoAAAANSUhEUgAAAAUA",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});
			const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);

			const navLogoImg = wrapper.find(".b-header-nav-chain__logo img");
			expect(navLogoImg).toHaveLength(1);
			expect(navLogoImg.prop("src")).toEqual("base64, iVBORw0KGgoAAAANSUhEUgAAAAUA");
		});
	});
});
