/* eslint-disable no-console */
import ArcAdsInstance, { logEvent } from "./index";

const siteProperties = {
	dfpId: 1234,
	websiteAdPath: "news",
};

const adConfig = {
	id: "arcad_6498",
	slotName: "news/test-page-ad-unit-path",
	adType: "300x250",
	adClass: "300x250",
	dimensions: [
		[300, 250],
		[300, 250],
		[300, 250],
	],
	sizemap: {
		breakpoints: [
			[1024, 0],
			[768, 0],
			[0, 0],
		],
		refresh: true,
	},
	targeting: {
		ad_slot: "300x250",
		breakpoint: "1024px",
		position: {
			as: "posn",
		},
	},
	display: "all",
};

const adRegisterProps = {
	publisherIds: {
		dfp_publisher_id: 1234,
	},
	params: adConfig,
};

describe("ArcAdsInstance", () => {
	describe("logEvent()", () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('logs "loaded" event when debugging enabled', () => {
			jest.spyOn(console, "info");
			logEvent({ creativeId: "test-id" }, true);
			expect(console.info).toHaveBeenCalledTimes(1);
		});

		it('logs "did not load" event when debugging enabled', () => {
			jest.spyOn(console, "info");
			logEvent({}, true);
			expect(console.info).toHaveBeenCalledTimes(1);
		});
	});

	describe("getInstance()", () => {
		it('has undefined "instance" static property before initialization', () => {
			expect(ArcAdsInstance.instance).not.toBeDefined();
		});

		it('assigns "instance" static property', () => {
			const arcAds = ArcAdsInstance.getInstance(siteProperties);
			expect(arcAds).toBeDefined();
			expect(ArcAdsInstance.instance).toEqual(arcAds);
		});

		it('assigns "properties" static property', () => {
			const arcAds = ArcAdsInstance.getInstance(siteProperties);
			expect(arcAds).toBeDefined();
			expect(ArcAdsInstance.properties).toEqual(siteProperties);
		});
	});

	describe("registerAd()", () => {
		it('returns "undefined" when "disableAds" prop is "true"', () => {
			const arcAds = ArcAdsInstance.getInstance(siteProperties);
			const registerAdReturn = arcAds.registerAd({
				adRegisterProps,
				disableAds: true,
			});
			expect(registerAdReturn).not.toBeDefined();
		});

		it("registers ad", () => {
			const arcAds = ArcAdsInstance.getInstance(siteProperties);
			jest.spyOn(arcAds, "registerAd");
			arcAds.registerAd(adRegisterProps);
			expect(arcAds.registerAd).toHaveBeenCalledTimes(1);
		});
	});
});
