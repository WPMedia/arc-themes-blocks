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
