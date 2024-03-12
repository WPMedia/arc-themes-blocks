import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";
import Navigation from "./default";
import { DEFAULT_SELECTIONS } from "./nav-helper";

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
	useContent: jest.fn(() => ({
		children: [
			{
				_id: "/news",
				display_name: "",
				name: "News",
				node_type: "section",
				url: "",
			},
			{
				_id: "/entertainment",
				display_name: "",
				name: "Entertainment",
				node_type: "section",
				url: "",
			},
			{
				_id: "1234567",
				display_name: "Custom Link",
				name: "",
				node_type: "link",
				url: "https://www.testsite.com/test",
			},
		]
	})),
}));

describe("the header navigation feature for the default output type", () => {
	describe("horizontal links bar", () => {
		it('should render horizontal links when "logoAlignment" is "left"', () => {
			const cFields = {
				...DEFAULT_SELECTIONS,
				logoAlignment: "left",
				horizontalLinksHierarchy: "default",
			};
			render(<Navigation customFields={cFields} />);
			expect(screen.getByLabelText("header-nav-chain-block.links-element-aria-label")).not.toBeNull();
		});

		it('should not render horizontal links when "logoAlignment" is "center"', () => {
			const cFields = {
				...DEFAULT_SELECTIONS,
				logoAlignment: "center",
				horizontalLinksHierarchy: "default",
			};
			render(<Navigation customFields={cFields} />);
			expect(screen.queryByLabelText("header-nav-chain-block.links-element-aria-label")).toBeNull();
		});
	});

	describe("navigation bar widgets/buttons", () => {
		describe("nav-bar default configuration", () => {
			it("should render search and sections menu in the top-left navbar on desktop", () => {
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navComponents = screen.getByTestId("nav-chain-nav-components-desktop-left")
				expect(within(navComponents).getByTestId("nav-chain-nav-search")).not.toBeNull();
				expect(within(navComponents).getByTestId("nav-chain-nav-section-button")).not.toBeNull();
				expect(within(navComponents).getByText("header-nav-chain-block.sections-button")).not.toBeNull();
			});

			it("should render sections menu in the top-left navbar on mobile", () => {
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navComponents = screen.getByTestId("nav-chain-nav-components-mobile-left")
				expect(within(navComponents).getByTestId("nav-chain-nav-section-button")).not.toBeNull();
				expect(within(navComponents).queryByText("header-nav-chain-block.sections-button")).toBeNull();
			});

			it("should render nothing inside the .nav-right on desktop", () => {
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navComponents = screen.getByTestId("nav-chain-nav-components-desktop-right")
				expect(navComponents).toBeEmptyDOMElement();
			});

			it("should render nothing inside the .nav-right on mobile", () => {
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				const navComponents = screen.getByTestId("nav-chain-nav-components-mobile-right")
				expect(navComponents).toBeEmptyDOMElement();
			});
		});
	});

	describe("sections menu widgets/buttons", () => {
		describe("sections menu custom configuration", () => {
			const testSectionMenuWidget = (customFields, breakpoint) => {
				const TestComponent = () => ( <div id="test-component">Test Component</div> );
				render(
					<Navigation customFields={customFields}>
						<TestComponent />
					</Navigation>
				);
				const navComponents = screen.getByTestId(`nav-chain-nav-components-${breakpoint}`);
				return navComponents;
			};

			it("should render custom widget on mobile", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentMobile1: "custom",
					menuComponentCustomIndexMobile1: 1,
				};
				const navComponents = testSectionMenuWidget(CUSTOM_SELECTIONS, "mobile");
				expect(within(navComponents).getByText("Test Component")).not.toBeNull();
			});
			it("should render custom widget on desktop", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentDesktop1: "custom",
					menuComponentCustomIndexDesktop1: 1,
				};
				const navComponents = testSectionMenuWidget(CUSTOM_SELECTIONS, "desktop");
				expect(within(navComponents).getByText("Test Component")).not.toBeNull();
			});
			it("should render two widgets on mobile", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentMobile1: "search",
					menuComponentMobile2: "custom",
					menuComponentCustomIndexMobile2: 1,
				};
				const navComponents = testSectionMenuWidget(CUSTOM_SELECTIONS, "mobile");
				expect(within(navComponents).getByTestId("nav-chain-nav-search")).not.toBeNull();
				expect(within(navComponents).getByText("Test Component")).not.toBeNull();
			});
			it("should render two widgets on desktop", () => {
				const CUSTOM_SELECTIONS = {
					...DEFAULT_SELECTIONS,
					menuComponentDesktop1: "custom",
					menuComponentCustomIndexDesktop1: 1,
					menuComponentDesktop2: "search",
				};
				const navComponents = testSectionMenuWidget(CUSTOM_SELECTIONS, "desktop");
				expect(within(navComponents).getByTestId("nav-chain-nav-search")).not.toBeNull();
				expect(within(navComponents).getByText("Test Component")).not.toBeNull();
			});
		});
	});

	describe("the navigation bar logo auto hide/show behavior", () => {
		describe("when the page has a masthead-block", () => {
			it("should hide the logo on the initial render", () => {
				getProperties.mockImplementation(() => ({}));
				render(
					<>
						<Navigation customFields={DEFAULT_SELECTIONS} />
						<div className="b-masthead" />
					</>
				);
				
				expect(screen.queryAllByRole("link").length).toBe(0);
				// The logo link and menu links have aria-hidden set, so there should be four total.
				expect(screen.getAllByRole("link", { hidden: true }).length).toBe(4);
			});

			it("should show the logo after 1 second if there is not a masthead", async () => {
				jest.useFakeTimers();
				getProperties.mockImplementation(() => ({}));
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
				});
				expect(screen.getByRole("link")).not.toBeNull();
			});

			it("should show the logo after 1 second on mobile devices", () => {
				jest.useFakeTimers();
				// we need to fake medium breakpoint because jest can't spy on innerWidth yet
				getProperties.mockImplementation(() => ({
					breakpoints: { small: 0, medium: 1500, large: 2000 },
				}));
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
				});

				expect(screen.getByRole("link")).not.toBeNull();
			});

			it("should show the logo after 1 second if there is a masthead but no logo", () => {
				jest.useFakeTimers();
				getProperties.mockImplementation(() => ({}));
				const spy = jest
					.spyOn(document, "querySelector")
					.mockImplementation((selector) =>
						selector === ".b-masthead .b-masthead__logo" ? undefined : {}
					);
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				expect(screen.queryAllByRole("link").length).toBe(0);
				act(() => {
					jest.runAllTimers();
				});

				expect(screen.getByRole("link")).not.toBeNull();
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

				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
				});

				expect(screen.queryByRole("link")).toBeNull();
				spy.mockRestore();
			});

			it("should setup scroll handlers, when masthead has logo", () => {
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
				render(<Navigation customFields={DEFAULT_SELECTIONS} />);
				act(() => {
					jest.runAllTimers();
				});

				expect(screen.queryByRole("link")).toBeNull();
				expect(handlerSetup).toBeTruthy();

				spy.mockRestore();
				spy2.mockRestore();
			});
		});
	});

	describe("hamburger menu", () => {
		it("opens and closes with the sections button", () => {
			render(<Navigation customFields={DEFAULT_SELECTIONS} />);
			const navComponents = screen.getByTestId("nav-chain-nav-components-desktop-left")
			fireEvent.click(within(navComponents).getByTestId("nav-chain-nav-section-button"));
			expect(screen.queryAllByRole("link").length).toBe(3);

			fireEvent.click(within(navComponents).getByTestId("nav-chain-nav-section-button"));
			expect(screen.queryAllByRole("link").length).toBe(0);
		});

		it("opens with the sections button and closes with the overlay", () => {
			render(<Navigation customFields={DEFAULT_SELECTIONS} />);
			const navComponents = screen.getByTestId("nav-chain-nav-components-desktop-left")
			fireEvent.click(within(navComponents).getByTestId("nav-chain-nav-section-button"));
			expect(screen.queryAllByRole("link").length).toBe(3);

			fireEvent.click(screen.getByTestId("nav-chain-flyout-overlay"));
			expect(screen.queryAllByRole("link").length).toBe(0);
		});
	});

	describe("dealing with accessibility and screen readers", () => {
		it("should render the block with the default aria-label", () => {
			render(<Navigation customFields={{}} />);
			expect(
				screen.getByLabelText("header-nav-chain-block.sections-element-aria-label")
			).not.toBeNull();
		});

		it("should render the block with the custom aria-label", () => {
			render(<Navigation customFields={{ ariaLabel: "Links" }} />);
			expect(screen.getByLabelText("Links")).not.toBeNull();
		});
	});

	describe("primary image", () => {
		it("shown without deployment function prefix if external http url", () => {
			jest.useFakeTimers();
			getProperties.mockReturnValueOnce({
				primaryLogo: "http://www.example.com/logo.png",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});

			render(<Navigation customFields={DEFAULT_SELECTIONS} />);
			act(() => {
				jest.runAllTimers();
			});
			const navLogoImg = screen.getByRole("img")
			expect(navLogoImg).not.toBeNull();
			expect(navLogoImg.getAttribute("src")).toEqual("http://www.example.com/logo.png");
		});

		it("shows image rendered from depoyment function if no http or base64 found", () => {
			jest.useFakeTimers();
			getProperties.mockReturnValueOnce({
				primaryLogo: "resources/images/logo.png",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});
			render(<Navigation customFields={DEFAULT_SELECTIONS} />);
			act(() => {
				jest.runAllTimers();
			});
			const navLogoImg = screen.getByRole("img")
			expect(navLogoImg).not.toBeNull();
			expect(navLogoImg.getAttribute("src")).toEqual("rendered-from-deployment");
		});

		it("shows image with deployment function used with base64", () => {
			jest.useFakeTimers();
			getProperties.mockReturnValueOnce({
				primaryLogo: "base64, iVBORw0KGgoAAAANSUhEUgAAAAUA",
			});
			useFusionContext.mockReturnValueOnce({
				contextPath: "pf",
				deployment: jest.fn(() => ({})).mockReturnValue("rendered-from-deployment"),
			});
			render(<Navigation customFields={DEFAULT_SELECTIONS} />);
			act(() => {
				jest.runAllTimers();
			});
			const navLogoImg = screen.getByRole("img")
			expect(navLogoImg).not.toBeNull();
			expect(navLogoImg.getAttribute("src")).toEqual("base64, iVBORw0KGgoAAAANSUhEUgAAAAUA");
		});
	});
});
