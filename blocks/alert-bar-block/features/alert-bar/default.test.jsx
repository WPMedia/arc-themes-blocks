/*
 Enzyme is using an old jsdom that has issues using waitFor on prototype
 methods and this component is using Component constructor and prototypes.

 This will set the proper jsdom environment for this specific test need
 until we can convert this away from the component model or update the test.

 @jest-environment jsdom-sixteen
*/

import React from "react";

import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";

import { isServerSide } from "@wpmedia/arc-themes-components";

import AlertBar, { AlertBarPresentational } from "./default";

const DEFAULT_ARIA_LABEL = "default aria-label";

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:properties", () => jest.fn(() => ({})));

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: () => ({
		t: jest.fn(() => DEFAULT_ARIA_LABEL),
	}),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

describe("the alert bar presentational component", () => {
	it("should render with passed in parameters", async () => {
		const { container } = render(
			<AlertBarPresentational
				alertRef={null}
				barAriaLabel="Alert bar"
				closeAriaLabel="Close"
				hideAlertHandler={null}
				linkText="Basic Headline"
				url="#"
			/>
		);

		await waitFor(() => expect(container.firstChild).not.toBe(null));
	});
});

describe("the alert bar feature rendered serverside", () => {
	beforeEach(() => {
		isServerSide.mockReturnValueOnce(true);
	});
	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should not render the alert bar if there is no article", () => {
		const content = {};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(null)),
		});

		const { container } = render(<AlertBar arcSite="the-sun" />);
		expect(container.firstChild).toBe(null);
	});
});

describe("the alert bar feature for the default output type", () => {
	it("should render the alert bar with link and headline if collection returns a article", async () => {
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: "This is a test headline",
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		render(<AlertBar arcSite="the-sun" />);

		const link = await screen.findByRole("link", { name: "This is a test headline" });
		expect(link).not.toBe(null);
	});

	it("should not render the alert bar if there is no article", () => {
		const content = {};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		const { container } = render(<AlertBar arcSite="the-sun" />);
		expect(container.firstChild).toBe(null);
	});
});

describe("the alert bar update interval", () => {
	beforeAll(() => {
		window.setInterval = jest.fn((func) => func());
	});
	afterAll(() => {
		window.setInterval.clearMock();
	});

	it("should be called", async () => {
		render(<AlertBar arcSite="the-sun" />);
		await expect(window.setInterval).toHaveBeenCalled();
	});
});

describe("the alert can handle user interaction", () => {
	it("must hide when click the close button", async () => {
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: "This is a test headline",
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		const getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => {
				resolve(content);
			}),
		});
		AlertBar.prototype.getContent = getContent;

		const { container, getByRole } = render(<AlertBar arcSite="the-sun" />);

		await waitFor(() => expect(container.firstChild).not.toBe(null));
		await waitFor(() => expect(getByRole("button")).not.toBeNull());
		const removal = waitForElementToBeRemoved(() => container.firstChild);
		fireEvent.click(getByRole("button"));
		expect(removal);
	});
	it("must set a cookie with the headline text when it's dismissed", async () => {
		const cookieText = "This is a test headline for cookie";
		const encodedCookie = "arcblock_alert-bar=This%20is%20a%20test%20headline%20for%20cookie";
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: cookieText,
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		const { container } = render(<AlertBar arcSite="the-sun" />);
		const button = await screen.findByRole("button");
		expect(button).not.toBeNull();
		const removal = waitForElementToBeRemoved(() => container.firstChild);
		fireEvent.click(button);
		expect(await removal);
		expect(document.cookie).toEqual(encodedCookie);
	});

	it("must not render alert when cookie matches the headline text", async () => {
		const cookieText = "cookie with text";
		const encodedCookie = "arcblock_alert-bar=cookie%20with%20text";
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: cookieText,
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};
		document.cookie = encodedCookie;

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		const { container } = render(<AlertBar arcSite="the-sun" />);
		expect(container.firstChild).toBe(null);
		expect(document.cookie).toEqual(encodedCookie);
	});
});

describe("when the alert is added to the header-nav-chain", () => {
	it("should render the block with the default aria-label", async () => {
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: "This is a test headline",
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		render(<AlertBar arcSite="the-sun" />);

		const nav = screen.findByRole("navigation", { name: DEFAULT_ARIA_LABEL });

		expect(nav).not.toBe(null);
	});

	it("should render the block with the default aria-label if blank", async () => {
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: "This is a test headline",
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		render(<AlertBar arcSite="the-sun" customFields={{ ariaLabel: "" }} />);

		const nav = screen.findByRole("navigation", { name: DEFAULT_ARIA_LABEL });

		expect(nav).not.toBe(null);
	});

	it("should render the block with the custom aria-label", async () => {
		const content = {
			_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
			type: "collection",
			content_elements: [
				{
					_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
					headlines: {
						basic: "This is a test headline",
					},
					websites: {
						"the-sun": {
							website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
						},
					},
				},
			],
		};

		AlertBar.prototype.getContent = jest.fn().mockReturnValue({
			cached: content,
			fetched: new Promise((resolve) => resolve(content)),
		});

		const { container, getByRole } = render(
			<AlertBar arcSite="the-sun" customFields={{ ariaLabel: "Breaking News from custom field" }} />
		);

		await waitFor(() => expect(container.firstChild).not.toBe(null));
		await expect(getByRole("navigation", { name: "Breaking News from custom field" })).not.toBe(
			null
		);
	});
});
