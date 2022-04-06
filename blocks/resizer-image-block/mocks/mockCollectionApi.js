const mockCollectionApiData = {
	_id: "OJEAAEFI3VB67DNAAGDBQ353ZA",
	version: "0.10.6",
	created_date: "2019-12-02T18:33:38.907Z",
	headlines: {
		basic: "Homepage – The Gazette",
	},
	last_updated_date: "2021-04-07T19:36:48.321Z",
	type: "collection",
	canonical_website: "the-gazette",
	content_elements: [
		{
			_id: "94ecbd60-7288-4baf-b3ec-ab563e95406a",
			type: "video",
			version: "0.8.0",
			canonical_url: "/video/2019/12/12/castle-church-tower/",
			canonical_website: "the-gazette",
			short_url: "/video/2019/12/12/castle-church-tower/",
			publish_date: "2021-03-30T15:26:55.000Z",
			display_date: "2019-12-12T20:49:05Z",
			headlines: {
				basic: "Castle church tower",
				meta_title: "This is the metatitle on this castle church tower video",
			},
			subheadlines: {
				basic: "This is the blurb on this castle church tower video",
			},
			description: {
				basic: "This is the caption on this castle church tower video",
			},
			credits: {
				affiliation: [
					{
						name: "Custom",
					},
				],
				by: [
					{
						type: "author",
						name: "",
						org: "Custom",
						slug: "",
					},
				],
			},
			taxonomy: {
				tags: [
					{
						text: "politics",
					},
					{
						text: "test",
					},
					{
						text: "this is all caps",
					},
					{
						text: "this is a video tag",
					},
				],
				primary_site: {
					type: "reference",
					additional_properties: {},
					_id: "/arts",
					referent: {
						type: "site",
						id: "/arts",
						provider: "",
					},
				},
				sites: [
					{
						type: "reference",
						additional_properties: {},
						_id: "/arts",
						referent: {
							type: "site",
							id: "/arts",
							provider: "",
						},
					},
					{
						type: "reference",
						additional_properties: {},
						_id: "/local",
						referent: {
							type: "site",
							id: "/local",
							provider: "",
						},
					},
					{
						type: "reference",
						additional_properties: {},
						_id: "/sports",
						referent: {
							type: "site",
							id: "/sports",
							provider: "",
						},
					},
				],
				primary_section: {
					_id: "/arts",
					_website: "the-gazette",
					type: "section",
					version: "0.6.0",
					name: "Arts",
					path: "/arts",
					parent_id: "/",
					parent: {
						default: "/",
					},
					additional_properties: {
						original: {
							_id: "/arts",
							_website: "the-gazette",
							name: "Arts",
							order: {
								"hamburger-menu": 1004,
								"links-bar": 1004,
								"horizontal-links": 1005,
								"links-bar-1": 1001,
							},
							parent: {
								default: "/",
								footer: null,
								"hamburger-menu": "/",
								"links-bar": "/",
								"horizontal-links": "/",
								"links-bar-1": "/",
							},
							ancestors: {
								default: [],
								footer: [],
								"hamburger-menu": [],
								"links-bar": ["/"],
								"horizontal-links": ["/"],
								"links-bar-1": ["/"],
							},
							inactive: false,
							node_type: "section",
						},
					},
					_website_section_id: "the-gazette./arts",
				},
				sections: [
					{
						_id: "/arts",
						_website: "the-gazette",
						type: "section",
						version: "0.6.0",
						name: "Arts",
						path: "/arts",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/arts",
								_website: "the-gazette",
								name: "Arts",
								order: {
									"hamburger-menu": 1004,
									"links-bar": 1004,
									"horizontal-links": 1005,
									"links-bar-1": 1001,
								},
								parent: {
									default: "/",
									footer: null,
									"hamburger-menu": "/",
									"links-bar": "/",
									"horizontal-links": "/",
									"links-bar-1": "/",
								},
								ancestors: {
									default: [],
									footer: [],
									"hamburger-menu": [],
									"links-bar": ["/"],
									"horizontal-links": ["/"],
									"links-bar-1": ["/"],
								},
								inactive: false,
								node_type: "section",
							},
						},
						_website_section_id: "the-gazette./arts",
					},
					{
						_id: "/business",
						_website: "the-planet",
						type: "section",
						version: "0.6.0",
						name: "Business",
						description: null,
						path: "/business",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/business",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Business",
								_website: "the-planet",
								parent: {
									default: "/",
									footer: "/news",
									"hamburger-menu": "/",
									"links-bar": "/",
								},
								ancestors: {
									default: [],
									footer: ["/", "/news"],
									"hamburger-menu": [],
									"links-bar": ["/"],
								},
								_admin: {
									alias_ids: ["/business"],
								},
								inactive: false,
								node_type: "section",
								order: {
									footer: 2002,
									"links-bar": 1003,
								},
							},
						},
						_website_section_id: "the-planet./business",
					},
					{
						_id: "/familj",
						_website: "dagen",
						type: "section",
						version: "0.6.0",
						name: "Familj",
						path: "/familj",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/familj",
								metadata: {
									metadata_title: "Familj - Dagen Familj",
									metadata_description:
										"Familjeartiklar från Dagen, Sveriges största dagstidning på kristen grund",
									metadata_keywords: null,
									content_code: "Free",
								},
								_website: "dagen",
								name: "Familj",
								order: {
									footer: 1002,
								},
								parent: {
									default: "/",
									footer: "/",
									"hamburger-menu": "/",
								},
								ancestors: {
									default: [],
									footer: ["/"],
									"hamburger-menu": [],
								},
								inactive: false,
								node_type: "section",
							},
						},
						_website_section_id: "dagen./familj",
					},
					{
						_id: "/health",
						_website: "the-sun",
						type: "section",
						version: "0.6.0",
						name: "Health",
						description: null,
						path: "/health",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/health",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Health",
								_website: "the-sun",
								parent: {
									default: "/",
									"hamburger-menu": "/",
								},
								ancestors: {
									default: [],
									"hamburger-menu": [],
								},
								_admin: {
									alias_ids: ["/health"],
								},
								inactive: false,
								node_type: "section",
							},
						},
						_website_section_id: "the-sun./health",
					},
					{
						_id: "/politics",
						_website: "the-mercury",
						type: "section",
						version: "0.6.0",
						name: "Politics",
						description: null,
						path: "/politics",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/politics",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Politics",
								_website: "the-mercury",
								parent: {
									default: "/",
									footer: "/sports",
									"hamburger-menu": "/",
									"links-bar": "/",
								},
								ancestors: {
									default: [],
									footer: ["/", "/sports"],
									"hamburger-menu": [],
									"links-bar": ["/"],
								},
								_admin: {
									alias_ids: ["/politics"],
								},
								inactive: false,
								node_type: "section",
								order: {
									footer: 2001,
									"links-bar": 1002,
								},
							},
						},
						_website_section_id: "the-mercury./politics",
					},
					{
						_id: "/sports",
						_website: "the-globe",
						type: "section",
						version: "0.6.0",
						name: "Sports",
						description: null,
						path: "/sports",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/sports",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Sports",
								_website: "the-globe",
								parent: {
									default: "/",
									footer: "/",
									"hamburger-menu": "/",
									"links-bar": "/",
								},
								ancestors: {
									default: [],
									footer: ["/"],
									"hamburger-menu": [],
									"links-bar": ["/"],
								},
								_admin: {
									alias_ids: ["/sports"],
								},
								inactive: false,
								node_type: "section",
								order: {
									footer: 1001,
									"links-bar": 1001,
								},
							},
						},
						_website_section_id: "the-globe./sports",
					},
					{
						_id: "/sports",
						_website: "the-prophet",
						type: "section",
						version: "0.6.0",
						name: "Sports",
						description: null,
						path: "/sports",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/sports",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Sports",
								_website: "the-prophet",
								parent: {
									default: "/",
									footer: "/news",
									"hamburger-menu": "/",
									"links-bar": "/",
								},
								ancestors: {
									default: [],
									footer: ["/", "/news"],
									"hamburger-menu": [],
									"links-bar": ["/"],
								},
								_admin: {
									alias_ids: ["/sports"],
								},
								inactive: false,
								node_type: "section",
								order: {
									footer: 2001,
									"links-bar": 1002,
								},
							},
						},
						_website_section_id: "the-prophet./sports",
					},
					{
						_id: "/local",
						_website: "the-gazette",
						type: "section",
						version: "0.6.0",
						name: "Local",
						path: "/local",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/local",
								_website: "the-gazette",
								name: "Local",
								order: {
									"hamburger-menu": 2001,
									"links-bar": 1002,
									"horizontal-links": 1002,
								},
								parent: {
									default: "/",
									footer: null,
									"hamburger-menu": "/news",
									"links-bar": "/",
									"horizontal-links": "/",
								},
								ancestors: {
									default: [],
									footer: [],
									"hamburger-menu": ["/news"],
									"links-bar": ["/"],
									"horizontal-links": ["/"],
								},
								inactive: false,
								node_type: "section",
							},
						},
						_website_section_id: "the-gazette./local",
					},
					{
						_id: "/sports",
						_website: "the-gazette",
						type: "section",
						version: "0.6.0",
						name: "Sports",
						description: null,
						path: "/sports",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/sports",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Sports",
								_website: "the-gazette",
								parent: {
									default: "/",
									footer: null,
									"hamburger-menu": "/",
									"links-bar": "/",
									"horizontal-links": "/",
								},
								ancestors: {
									default: [],
									footer: [],
									"hamburger-menu": [],
									"links-bar": ["/"],
									"horizontal-links": ["/"],
								},
								_admin: {
									alias_ids: ["/sports"],
								},
								inactive: false,
								node_type: "section",
								order: {
									"hamburger-menu": 1003,
									"links-bar": 1003,
									"horizontal-links": 1003,
								},
							},
						},
						_website_section_id: "the-gazette./sports",
					},
					{
						_id: "/sports",
						_website: "the-mercury",
						type: "section",
						version: "0.6.0",
						name: "Sports",
						description: null,
						path: "/sports",
						parent_id: "/",
						parent: {
							default: "/",
						},
						additional_properties: {
							original: {
								_id: "/sports",
								site: {
									site_tagline: null,
									pagebuilder_path_for_native_apps: null,
									site_description: null,
									site_url: null,
									site_keywords: null,
									site_title: null,
									site_about: null,
								},
								social: {
									rss: null,
									twitter: null,
									instagram: null,
									facebook: null,
								},
								navigation: {
									nav_title: null,
								},
								site_topper: {
									site_logo_image: null,
								},
								name: "Sports",
								_website: "the-mercury",
								parent: {
									default: "/",
									footer: "/",
									"hamburger-menu": "/",
									"links-bar": "/",
								},
								ancestors: {
									default: [],
									footer: ["/"],
									"hamburger-menu": [],
									"links-bar": ["/"],
								},
								_admin: {
									alias_ids: ["/sports"],
								},
								inactive: false,
								node_type: "section",
								order: {
									footer: 1001,
									"links-bar": 1001,
								},
							},
						},
						_website_section_id: "the-mercury./sports",
					},
				],
				seo_keywords: [],
			},
			promo_items: {
				basic: {
					url: "https://d22ff27hdsy159.cloudfront.net/12-12-2019/t_42fd2e985d3f4b868b927ca58620a2ca_name_file_1280x720_2000_v3_1_.jpg",
					type: "image",
					version: "0.5.8",
					credits: {},
					caption: "Caption for the castle church tower video promo image",
					width: 1280,
					height: 720,
				},
			},
			revision: {
				published: true,
			},
			distributor: {
				name: "Pixabay",
				category: "stock",
				mode: "custom",
			},
			additional_properties: {},
			websites: {
				"the-gazette": {
					website_section: {
						path: "/arts",
						_website: "the-gazette",
						name: "Arts",
						_id: "/arts",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/video/2019/12/12/castle-church-tower/",
				},
				"the-planet": {
					website_section: {
						path: "/business",
						_website: "the-planet",
						name: "Business",
						_id: "/business",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
				dagen: {
					website_section: {
						path: "/familj",
						_website: "dagen",
						name: "Familj",
						_id: "/familj",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
				"the-sun": {
					website_section: {
						path: "/health",
						_website: "the-sun",
						name: "Health",
						_id: "/health",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
				"the-mercury": {
					website_section: {
						path: "/politics",
						_website: "the-mercury",
						name: "Politics",
						_id: "/politics",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
				"the-globe": {
					website_section: {
						path: "/sports",
						_website: "the-globe",
						name: "Sports",
						_id: "/sports",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
				"the-prophet": {
					website_section: {
						path: "/sports",
						_website: "the-prophet",
						name: "Sports",
						_id: "/sports",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/12/12/castle-church-tower/",
				},
			},
		},
	],
	description: {
		basic: "Homepage collection for The Gazette website",
	},
	content_aliases: ["homepage"],
	dynamic_items: {
		type: "sections",
		ids: ["/news", "/local"],
	},
	owner: {
		id: "corecomponents",
	},
	revision: {
		branch: "default",
		published: true,
	},
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	website: "the-gazette",
};

export default mockCollectionApiData;
