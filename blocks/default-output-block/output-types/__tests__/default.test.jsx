describe("This test is disabled", () => {
	it("should succeed", () => {
		expect(true);
	});
});

// /**
//  * this is for mocking node env
//  * will not have window attribute, testing ssr
//  * https://jestjs.io/docs/en/configuration.html#testenvironment-string
//  * @jest-environment node
//  */
// import React from "react";
// import { shallow } from "enzyme";
// import { configureSinglePageApp } from "../default";

// const dummyComp = () => <meta content="dummy" />;
// const mockFuntions = {
// 	Libs: dummyComp,
// 	CssLinks: dummyComp,
// 	Fusion: dummyComp,
// };

// describe("the default output type", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				websiteName: "The Sun",
// 				twitterUsername: "thesun",
// 				dangerouslyInjectJS: [],
// 				websiteDomain: "",
// 				fallbackImage: "/resources/placeholder.jpg",
// 				resizerURL: "resizer",
// 				locale: "en",
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("should render", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} {...mockFuntions} />
// 		);
// 		expect(wrapper).toBeDefined();
// 	});
// });

// describe("renders a page", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				websiteName: "The Sun",
// 				twitterUsername: "thesun",
// 				dangerouslyInjectJS: [],
// 				websiteDomain: "",
// 				fallbackImage: "/resources/placeholder.jpg",
// 				resizerURL: "resizer",
// 				fontUrl: ["https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto"],
// 				locale: "en",
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("should have a head", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("head").length).toBe(1);
// 	});

// 	it("should have a font loading URL", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("[data-testid='font-loading-url-0']").length).toBe(1);
// 	});

// 	it("should have a body", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("body").length).toBe(1);
// 		expect(wrapper.find("body #fusion-app").length).toBe(1);
// 	});

// 	it("should have script tags", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").length).toBe(2);
// 	});

// 	it("should have link tags", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("link").length).toBe(3);
// 	});

// 	it("should have a MedataData component", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("MetaData").length).toBe(1);
// 	});

// 	it("MedataData should receive twitterUsername", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("MetaData").prop("twitterUsername")).toEqual("thesun");
// 	});
// });

// describe("root html layout", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				websiteName: "The Sun",
// 				twitterUsername: "thesun",
// 				dangerouslyInjectJS: [],
// 				websiteDomain: "",
// 				fallbackImage: "/resources/placeholder.jpg",
// 				resizerURL: "resizer",
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("html must have only head and body tags", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		const html = wrapper.find("html");
// 		expect(html.length).toBe(1);
// 		expect(html.children().length).toBe(2);
// 		expect(html.children("head").length).toBe(1);
// 		expect(html.children("body").length).toBe(1);
// 	});

// 	it("must take in a language", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				locale: "fr",
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");

// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);

// 		expect(wrapper.find("html").prop("lang")).toBe("fr");
// 	});

// 	it("must have a default dir attribute of ltr in the HTML tag", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("html").prop("dir")).toBe("ltr");
// 	});

// 	it("must use the textDirection property in the HTML tag", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				textDirection: "rtl",
// 			}))
// 		);
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("html").prop("dir")).toBe("rtl");
// 	});

// 	it("must have a style tag in the page head with writing-mode of horizontal-tb", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		const styleElement = wrapper.find("head style");
// 		const styleText = styleElement.text();

// 		expect(styleText).toContain("body { writing-mode: horizontal-tb; }");
// 	});

// 	it("must use the textFlow property as the writing-mode in the style tag in the page head", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				textFlow: "vertical-rl",
// 			}))
// 		);
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		const styleElement = wrapper.find("head style");
// 		const styleText = styleElement.text();

// 		expect(styleText).toContain("body { writing-mode: vertical-rl; }");
// 	});
// });

// describe("head content", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				websiteName: "The Sun",
// 				twitterUsername: "thesun",
// 				dangerouslyInjectJS: ['alert("hello world");'],
// 				websiteDomain: "",
// 				fallbackImage: "/resources/placeholder.jpg",
// 				resizerURL: "resizer",
// 				gtmID: "GTM-12345ID",
// 				gaID: "UA-6789ID",
// 				fontUrl: "https://fonts.googleapis.com/css?family=Open Sans",
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must render Google Tag Manager script", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "inlineScripts" }).html()).toMatch(
// 			/GTM-12345ID/
// 		);
// 		expect(wrapper.find("body > noscript").find({ title: "gtm" }).html()).toMatch(/GTM-12345ID/);
// 	});

// 	it("must render Google Analytics script", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(
// 			wrapper.find("script").find({ "data-integration": "googleAnalyticsTag" }).at(0).html()
// 		).toMatch(/UA-6789ID/);
// 	});

// 	it("must render custom script", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(
// 			wrapper.find("script").find({ "data-integration": "inlineScripts" }).at(0).html()
// 		).toMatch(/hello world/);
// 	});

// 	it("must render custom font url", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);

// 		expect(wrapper.find("link").at(2).html()).toMatch(/fonts.googleapis/);
// 	});

// 	it("must not render nested scripts", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		const scripts = wrapper.find("script");
// 		for (let i = 0; i < scripts.length; i += 1) {
// 			expect(
// 				scripts
// 					.at(i)
// 					.html()
// 					.match(/<script[^>]*>.*?<script/gs)
// 			).toBeNull();
// 		}
// 	});

// 	it("must not render nativo script", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "nativo-ad" }).length).toBe(0);
// 	});
// });

// describe("body content", () => {
// 	it("should render a Skip To Main link", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find(".skip-main").length).toBe(1);
// 	});
// });

// describe("nativo ad integration", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				websiteName: "The Sun",
// 				twitterUsername: "thesun",
// 				dangerouslyInjectJS: ['alert("hello world");'],
// 				websiteDomain: "",
// 				fallbackImage: "/resources/placeholder.jpg",
// 				resizerURL: "resizer",
// 				gtmID: "GTM-12345ID",
// 				gaID: "UA-6789ID",
// 				fontUrl: "https://fonts.googleapis.com/css?family=Open Sans",
// 				nativoIntegration: true,
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must add Nativo Ad script when is enabled on the properties", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="nativo-ad"]').length).toBe(1);
// 	});
// });

// describe("head content without properties", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));

// 		jest.mock("fusion:properties", () => jest.fn(() => ({})));
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must not render chartbeat code", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
// 	});
// });

// describe("chartbeat render conditions", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must not render chartbeat code when properties are missing", () => {
// 		jest.mock("fusion:properties", () => jest.fn(() => ({})));

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
// 	});

// 	it("must not render chartbeat code when chartbeatAccountId property is missing", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				chartbeatDomain: "example.com",
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
// 	});

// 	it("must not render chartbeat code when chartbeatDomain property is missing", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				chartbeatAccountId: 994949,
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
// 	});

// 	it("must not render chartbeat code when both properties are empty", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				chartbeatAccountId: "",
// 				chartbeatDomain: "",
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
// 	});

// 	it("must render chartbeat code when chartBeatDomain and chartBeatAccountID properties are present", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				chartbeatAccountId: 994949,
// 				chartbeatDomain: "example.com",
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "chartbeat" }).length).toBe(1);
// 	});
// });

// describe("comscore render conditions", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must not render comscore code when property is missing", () => {
// 		jest.mock("fusion:properties", () => jest.fn(() => ({})));

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "comscore" }).length).toBe(0);
// 		expect(wrapper.find("noscript").find({ "data-integration": "comscore" }).length).toBe(0);
// 	});

// 	it("must render comscore code when comscoreID site property is present", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				comscoreID: 88776655,
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "comscore" }).length).toBe(1);
// 		expect(wrapper.find("noscript").find({ "data-integration": "comscore" }).length).toBe(1);
// 	});
// });

// describe("queryly render conditions", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:context", () => ({
// 			useFusionContext: jest.fn(() => ({
// 				globalContent: {},
// 				arcSite: "the-sun",
// 				requestUri: "/queryly-search/?query=test%20search",
// 			})),
// 		}));

// 		jest.mock("react-dom/server", () => ({
// 			renderToString: jest.fn().mockReturnValue("<meta />"),
// 		}));
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must not render Queryly code when property is missing", () => {
// 		jest.mock("fusion:properties", () => jest.fn(() => ({})));

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "queryly" }).length).toBe(0);
// 	});

// 	it("must render Queryly code when querylyId site property is present", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				querylyId: 88776655,
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "queryly" }).length).toBe(1);
// 	});

// 	it("must render Queryly advanced search when page type is search-queryly", () => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				querylyId: 88776655,
// 			}))
// 		);

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("queryly-search")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "queryly" }).length).toBe(2);
// 	});
// });

// describe("The spa property", () => {
// 	// we're only expecting spaSites to be an array or undefined
// 	it("should be set as true if spaSites is undefined", () => {
// 		expect(configureSinglePageApp(undefined)).toStrictEqual(true);
// 	});
// 	it("should be set to empty array if spaSites is an empty array", () => {
// 		expect(configureSinglePageApp([])).toStrictEqual([]);
// 	});
// 	it("should be set to a one-item array if one site id is passed in to spaSites", () => {
// 		const spaSites = ["the-sun"];
// 		expect(configureSinglePageApp(spaSites)).toStrictEqual(spaSites);
// 	});
// });

// describe("retail api script render conditions", () => {
// 	beforeAll(() => {
// 		jest.mock("fusion:properties", () =>
// 			jest.fn(() => ({
// 				api: {
// 					retail: {
// 						script: "/retail/script.js",
// 					},
// 				},
// 			}))
// 		);
// 	});
// 	afterAll(() => {
// 		jest.resetModules();
// 	});

// 	it("must render when site property is present", () => {
// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "arcp" }).length).toBe(1);
// 	});

// 	it("must not render when property is missing", () => {
// 		jest.mock("fusion:properties", () => jest.fn(() => ({})));

// 		const { default: DefaultOutputType } = require("../default");
// 		const wrapper = shallow(
// 			<DefaultOutputType
// 				deployment={jest.fn()}
// 				metaValue={jest.fn().mockReturnValue("article")}
// 				{...mockFuntions}
// 			/>
// 		);
// 		expect(wrapper.find("script").find({ "data-integration": "arcp" }).length).toBe(0);
// 	});
// });
