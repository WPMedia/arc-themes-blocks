import formatAuthors from ".";

export default {
	title: "Utilities/Format Authors",
	component: formatAuthors,
};

export const OneItem = {
	render: () =>
		formatAuthors([
			{
				name: "Author One",
				type: "author",
				url: "#",
			},
		]),

	name: "One item",
};

export const ThreeItems = {
	render: () =>
		formatAuthors([
			{
				name: "Author One",
				type: "author",
				url: "#",
			},
			{
				name: "Author Two",
				type: "author",
			},
			{
				name: "Author Three",
				type: "author",
				url: "#",
			},
		]),

	name: "Three items",
};

export const ThreeItemsWithACustomConjunction = {
	render: () =>
		formatAuthors(
			[
				{
					name: "Author One",
					type: "author",
					url: "#",
				},
				{
					name: "Author Two",
					type: "author",
				},
				{
					name: "Author Three",
					type: "author",
					url: "#",
				},
			],
			"or",
		),

	name: "Three items, with a custom conjunction",
};

export const TwoItems = {
	render: () =>
		formatAuthors([
			{
				name: "Author One",
				type: "author",
				url: "#",
			},
			{
				name: "Author Two",
				type: "author",
			},
		]),

	name: "Two items",
};
