import React from "react";
import { render } from "@testing-library/react";
import getProperties from "fusion:properties";

import AdTaboola from "./default";

const TBL_WRAPPER = ".tbl-wrapper";

const metaValueMock = () => "article";

describe("render Taboola widget", () => {
	describe("when missing configuration parameters", () => {
		it("must not render when there isn't parameters", () => {
			const { container } = render(<AdTaboola metaValue={metaValueMock} />);

			expect(container.querySelector("#tbl-widget")).toBe(null);
			expect(container.querySelector(TBL_WRAPPER)).toBe(null);
		});

		it("must not render when only the publisher id is present", () => {
			getProperties.mockImplementation(() => ({
				taboolaPublisherId: "taboolaPublisherId",
			}));
			const { container } = render(<AdTaboola metaValue={metaValueMock} />);

			expect(container.querySelector("#tbl-widget")).toBe(null);
			expect(container.querySelector(TBL_WRAPPER)).toBe(null);
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
			expect(container.querySelector("#tbl-widget")).toBe(null);
			expect(container.querySelector(TBL_WRAPPER)).toBe(null);
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

			expect(container.querySelector("#tbl-widget")).not.toBe(null);
			expect(container.querySelector("script")).not.toBe(null);
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

			const { container } = render(
				<AdTaboola metaValue={metaValueMock} customFields={customFields} isAdmin />
			);

			expect(container.querySelector(TBL_WRAPPER)).not.toBe(null);
			expect(container.querySelector("AdTaboola #tbl-widget")).toBe(null);
			expect(container.querySelector("AdTaboola script")).toBe(null);
		});
	});
});

describe("insertLoader branch coverage", () => {
	const cleanupScripts = () => {
		const loader = document.getElementById("tbl-loader");
		if (loader) loader.parentNode.removeChild(loader);
		const flusher = document.getElementById("tbl-flusher");
		if (flusher) flusher.parentNode.removeChild(flusher);
	};

	beforeEach(() => {
		cleanupScripts();
	});

	afterEach(() => {
		cleanupScripts();
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

		expect(document.getElementById("tbl-loader")).toBeNull();
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
		const firstLoader = document.getElementById("tbl-loader");
		expect(firstLoader).not.toBeNull();

		// Second render — insertLoader should return early without inserting a duplicate
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const loaders = document.querySelectorAll("#tbl-loader");
		expect(loaders.length).toBe(1);
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
		expect(document.getElementById("tbl-flusher")).not.toBeNull();

		// Second render — insertFlusher should return early without inserting a duplicate
		render(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
		const flushers = document.querySelectorAll("#tbl-flusher");
		expect(flushers.length).toBe(1);
	});
});
