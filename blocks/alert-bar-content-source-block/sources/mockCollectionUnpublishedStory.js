const CollectionWithUnpublishedStory = {
	_id: "VTKOTRJXEVATHG7MELTPZ2RIBU",
	headlines: {
		basic: "Alert Bar – The Sun",
	},
	type: "collection",
	version: "0.7.0",
	canonical_website: "the-sun",
	content_elements: [
		{
			referent: {
				id: "GKCW5R7J6BHWHFTG436KWQESVA",
				type: "story",
			},
			type: "promo_reference",
		},
	],
	description: {
		basic:
			"Alert Bar collection for The Sun website. If a story is added to this collection, it will appear in the Alert Bar Block on a Theme website until it is removed from this collection. ",
	},
	content_aliases: ["alert-bar"],
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
	last_updated_date: "1970-01-01T00:00:00.000Z",
	created_date: "1970-01-01T00:00:00.000Z",
	website: "the-sun",
};

export default CollectionWithUnpublishedStory;
