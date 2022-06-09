/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import { renderToString } from "react-dom/server";
import Link from "./link";

describe("When the link is generated SSR", () => {
	it("must add a final slash to internal urls", () => {
		const link = renderToString(Link({ href: "/entertaiment", name: "Entertaiment" }));
		expect(link).toMatch(/\/entertaiment\//);
		expect(link).toMatch(/>*Entertaiment</);
	});

	it("must not add a final slash to links with query params", () => {
		const link = renderToString(Link({ href: "/entertaiment?search=abc", name: "Entertaiment" }));
		expect(link).toMatch(/\/entertaiment\?search=abc/);
	});

	it("must not add a final slash to links with hash params", () => {
		const link = renderToString(
			Link({ href: "/entertaiment/page#some-anchor", name: "Entertaiment" })
		);
		expect(link).toMatch(/\/entertaiment\/page#some-anchor/);
	});

	it("must not add a final slash to links with a htmlpage", () => {
		const link = renderToString(Link({ href: "/entertaiment/page.html", name: "Entertaiment" }));
		expect(link).toMatch(/\/entertaiment\/page\.html/);
	});

	it("must add rel attriutes to external links", () => {
		const link = renderToString(
			Link({ href: "https://example.com/some/page.html", name: "Entertaiment" })
		);
		expect(link).toMatch(/href="https:\/\/example.com\/some\/page.html"/);
		expect(link).toMatch(/target="_blank"/);
		expect(link).toMatch(/rel="noopener noreferrer"/);
	});
});
