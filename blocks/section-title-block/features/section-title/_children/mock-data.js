const mockOneSection = {
	arcSite: "site",
	globalContent: {
		_id: "/",
		name: "Section Title",
		children: [
			{
				_id: "/news",
				_website: "The Washington Post",
				privilege: "News",
				name: "News",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [],
			},
		],
	},
};

const mockTwoSection = {
	arcSite: "site",
	globalContent: {
		_id: "/",
		name: "Section Title",
		children: [
			{
				_id: "/news",
				_website: "The Washington Post",
				privilege: "News",
				name: "News",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [],
			},
			{
				_id: "/sports",
				_website: "The Washington Post",
				privilege: "Sports",
				name: "Sports",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [],
			},
		],
	},
};

const mockTwoSectionWithUrl = {
	arcSite: "site",
	globalContent: {
		_id: "/",
		name: "Section Title",
		children: [
			{
				_id: "/news",
				_website: "The Washington Post",
				privilege: "News",
				name: "News",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [],
			},
			{
				_id: "/sports",
				_website: "The Washington Post",
				privilege: "Sports",
				display_name: "Sports",
				url: "www.google.com",
				node_type: "link",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [],
			},
		],
	},
};

const mockNestedChildren = {
	arcSite: "site",
	globalContent: {
		_id: "/",
		name: "Section Title",
		children: [
			{
				_id: "/news",
				_website: "The Washington Post",
				privilege: "News",
				name: "News",
				order: {
					default: 1002,
				},
				ancestors: {
					default: ["/"],
				},
				inactive: false,
				children: [
					{
						_id: "/sports-news",
						_website: "The Washington Post",
						privilege: "News",
						name: "Sports",
						order: {
							default: 1002,
						},
						ancestors: {
							default: ["/"],
						},
						inactive: false,
					},
					{
						_id: "/political-news",
						_website: "The Washington Post",
						privilege: "News",
						name: "Politics",
						order: {
							default: 1002,
						},
						ancestors: {
							default: ["/"],
						},
						inactive: false,
					},
					{
						_id: "/global-news",
						_website: "The Washington Post",
						privilege: "News",
						name: "Global",
						order: {
							default: 1002,
						},
						ancestors: {
							default: ["/"],
						},
						inactive: false,
					},
				],
			},
		],
	},
};

const mockNoChildren = {
	arcSite: "site",
	globalContent: {
		_id: "/",
		name: "Section Title",
		children: [],
	},
};

export {
	mockOneSection,
	mockTwoSection,
	mockNestedChildren,
	mockNoChildren,
	mockTwoSectionWithUrl,
};
