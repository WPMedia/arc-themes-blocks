/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import mockFocalBasicPoint from "./mocks/mockStoryPromoItemsBasicFocalPoint";
import mockFocalLeadArtPoint from "./mocks/mockStoryPromoItemsLeadArtFocalPoint";
import mockFocalPointOverwrite from "./mocks/mockStoryPromoItemsBasicFocalPointOverwrite";
import mockGalleryFocalPoint from "./mocks/mockStoryPromoItemsGalleryFocalPoint";

import { focalPointFromContent } from "./resolveFocalPoint";

describe("focal point usage", () => {
	it("must return undefined if has not content", () => {
		expect(focalPointFromContent()).toBeFalsy();
	});

	it("must return undefined if has not promo_items", () => {
		expect(focalPointFromContent({})).toBeFalsy();
	});

	it("must return undefined if promo_items is not image or gallery", () => {
		expect(focalPointFromContent({ promo_items: { type: "video" } })).toBeFalsy();
	});

	it("must return the focal point from a promo item basic element", () => {
		const { focal_point: focalPoint } = mockFocalBasicPoint.promo_items.basic;
		expect(focalPointFromContent(mockFocalBasicPoint)).toEqual(focalPoint);
	});

	it("must return the correct focal point from a basic promo item when the focal point was overwritten", () => {
		const { focal_point: focalPoint } =
			mockFocalPointOverwrite.promo_items.basic.additional_properties;
		const focalPointNormalized = {
			x: parseInt(focalPoint.min[0], 10),
			y: parseInt(focalPoint.min[1], 10),
		};
		expect(focalPointFromContent(mockFocalPointOverwrite)).toEqual(focalPointNormalized);
	});

	it("must return the correct focal point from a lead_art promo item when the focal point was overwritten", () => {
		const { focal_point: focalPoint } =
			mockFocalLeadArtPoint.promo_items.lead_art.additional_properties;
		const focalPointNormalized = {
			x: parseInt(focalPoint.min[0], 10),
			y: parseInt(focalPoint.min[1], 10),
		};

		expect(focalPointFromContent(mockFocalLeadArtPoint)).toEqual(focalPointNormalized);
	});

	it("must return the focal point from a Gallery's promo item", () => {
		const { focal_point: focalPoint } =
			mockGalleryFocalPoint.promo_items.lead_art.promo_items.basic;

		expect(focalPointFromContent(mockGalleryFocalPoint)).toEqual(focalPoint);
	});
});
