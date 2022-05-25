/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import { renderToString } from "react-dom/server";
import Link from "./link";

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	formatURL: jest.fn((input) => input),
}));
describe("When the link is generated SSR", () => {
	it("must add rel attributes to external links", () => {
		const link = renderToString(
			Link({ href: "https://example.com/some/page.html", name: "Entertaiment" })
		);
		expect(link).toMatch(/target="_blank"/);
		expect(link).toMatch(/rel="noopener noreferrer"/);
	});
});
