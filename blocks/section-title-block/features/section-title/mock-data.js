const mockOneSection = {
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
};

const mockTwoSection = {
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
};

const mockTwoSectionWithUrl = {
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
};

const mockNoChildren = {
	_id: "/",
	display_name: "Section Title Display Name",
	children: [],
};

export { mockOneSection, mockTwoSection, mockNoChildren, mockTwoSectionWithUrl };
