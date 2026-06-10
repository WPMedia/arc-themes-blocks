import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import getProperties from "fusion:properties";

import AdTaboola from "./default";

const metaValueMock = () => "article";

describe("render Taboola widget", () => {
	describe("when missing configuration parameters", () => {
		it("must not render when there isn't parameters", () => {
			const { container } = render(<AdTaboola metaValue={metaValueMock} />);

			expect(container).toBeEmptyDOMElement();
		});

		it("must not render when only the publisher id is present", () => {
			getProperties.mockImplementation(() => ({
				taboolaPublisherId: "taboolaPublisherId",
			}));
			const { container } = render(<AdTaboola metaValue={metaValueMock} />);

			expect(container).toBeEmptyDOMElement();
		});

		it("must not render when some of the widget parameters are missing", () => {
			getProperties.mockImplementation(() => ({
				taboolaPublisherId: "taboolaPublisherId",
			}));
			const customFields = {
				container: "tbl-widget",
			};

			const { container } = render(
				<AdTaboola metaValue={metaValueMock} customFields={customFields} />
			);
			expect(container).toBeEmptyDOMElement();
		});
	});

	describe("when have all config the paramters", () => {
		it("must render the widget", () => {
			getProperties.mockImplementation(() => ({
				taboolaPublisherId: "taboolaPublisherId",
			}));
			const customFields = {
				placement: "a",
				mode: "b",
				container: "tbl-widget",
			};

			const { container } = render(
				<AdTaboola metaValue={metaValueMock} customFields={customFields} />
			);

			expect(container).not.toBeEmptyDOMElement();
		});

		it("must render the visual wrapper on admin", () => {
			getProperties.mockImplementation(() => ({
				taboolaPublisherId: "taboolaPublisherId",
			}));
			const customFields = {
				placement: "a",
				mode: "b",
				container: "tbl-widget",
			};

			render(
				<AdTaboola metaValue={metaValueMock} customFields={customFields} isAdmin />
			);

			expect(screen.getByText("a")).not.toBeNull();
			expect(screen.queryByText("tbl-widget")).toBeNull();
		});
	});
});

describe("insertLoader branch coverage", () => {
	let appendedToHead = [];
	let appendedToBody = [];

	beforeEach(() => {
		appendedToHead = [];
		appendedToBody = [];

		jest.spyOn(document, "getElementById").mockImplementation((id) =>
			[...appendedToHead, ...appendedToBody].find((el) => el.id === id) || null,
		);
		jest.spyOn(document.head, "appendChild").mockImplementation((el) => {
			appendedToHead.push(el);
			return el;
		});
		jest.spyOn(document.body, "appendChild").mockImplementation((el) => {
			appendedToBody.push(el);
			return el;
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should not append loader script when page type is not in PAGE_TYPE_TABOOLA_MAPPING", () => {
		getProperties.mockImplementation(() => ({
			taboolaPublisherId: "taboolaPublisherId",
		}));
		const customFields = {
			placement: "a",
			mode: "b",
			container: "tbl-widget-unknown",
		};
		// "unknown-type" is not a key in PAGE_TYPE_TABOOLA_MAPPING
		const unknownMetaValue = () => "unknown-type";

		render(<AdTaboola metaValue={unknownMetaValue} customFields={customFields} />);

		const loaderAppended = appendedToHead.some((el) => el.id === "tbl-loader");
		expect(loaderAppended).toBe(false);
	});

	it("should not append a duplicate loader script when #tbl-loader already exists", () => {
		getProperties.mockImplementation(() => ({
			taboolaPublisherId: "taboolaPublisherId",
		}));
		const customFields = {
			placement: "a",
			mode: "b",
			container: "tbl-widget-dup",
		};

		// First render inserts the loader
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const firstRenderLoaderCount = appendedToHead.filter((el) => el.id === "tbl-loader").length;
		expect(firstRenderLoaderCount).toBe(1);

		// Second render — insertLoader should return early without inserting a duplicate
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const totalLoaderCount = appendedToHead.filter((el) => el.id === "tbl-loader").length;
		expect(totalLoaderCount).toBe(1);
	});

	it("should not append a duplicate flusher script when #tbl-flusher already exists", () => {
		getProperties.mockImplementation(() => ({
			taboolaPublisherId: "taboolaPublisherId",
		}));
		const customFields = {
			placement: "a",
			mode: "b",
			container: "tbl-widget-dup-flusher",
		};

		// First render inserts the flusher
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const firstRenderFlusherCount = appendedToBody.filter((el) => el.id === "tbl-flusher").length;
		expect(firstRenderFlusherCount).toBe(1);

		// Second render — insertFlusher should return early without inserting a duplicate
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const totalFlusherCount = appendedToBody.filter((el) => el.id === "tbl-flusher").length;
		expect(totalFlusherCount).toBe(1);
	});
});
