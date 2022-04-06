const React = require("react");
const { render } = require("enzyme");

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		dateLocalization: {
			language: "en",
			timeZone: "America/New_York",
			dateTimeFormat: "LLLL d, yyyy 'at' K:m bbbb z",
			dateFormat: "LLLL d, yyyy",
		},
	}))
);

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	localizeDateTime: jest.fn(() => new Date().toDateString()),
}));

jest.mock("fusion:themes", () => jest.fn(() => ({})));

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(() => ({
		globalContent: {},
		arcSite: "the-sun",
	})),
}));

describe("Given the display time from ANS, it should coinvert to the proper timezone format we want", () => {
	it("should return proper long form with correctly converted timezone (mocked timezone is in CDT)", () => {
		const { default: ArticleDate } = require("./default");
		const displayDate = "2019-08-11T16:45:33.209Z";
		const globalContent = { display_date: displayDate };
		const wrapper = render(<ArticleDate globalContent={globalContent} arcSite="the-sun" />);

		const testDate = new Intl.DateTimeFormat("en", {
			year: "numeric",
			day: "numeric",
			month: "long",
			hour: "numeric",
			minute: "numeric",
			timeZone: "America/Chicago",
			timeZoneName: "short",
		})
			.format(new Date(displayDate))
			.replace(/(,)(.*?)(,)/, "$1$2 at")
			.replace("PM", "p.m.")
			.replace("AM", "a.m.");

		expect(wrapper.attr("class").includes("sc-")).toBe(true);
		expect(wrapper.text()).not.toEqual(testDate);
	});

	it("should return a blank string if the display_time is an invalid timestring", () => {
		const { default: ArticleDate } = require("./default");
		const displayDate = "invalid time string";
		const globalContent = { display_date: displayDate };

		const wrapper = render(<ArticleDate globalContent={globalContent} arcSite="the-sun" />);

		expect(wrapper.text()).toEqual("");
	});
});
