// eslint-disable-next-line import/prefer-default-export
export const linksBarMock = (query) => {
	const mocks = {
		noData: { children: [] },
		oneLink: {
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
			],
		},
		twoLinks: {
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
			],
		},
		threeLinks: {
			children: [
				{
					_id: "id_1",
					name: "test link 1",
				},
				{
					_id: "id_2",
					name: "test link 2",
				},
				{
					_id: "id_3",
					node_type: "link",
					url: "/",
					display_name: "Link Text",
				},
			],
		},
		tenLinks: {
			children: [
				{
					_id: "id_1",
					name: "Test Link 1",
				},
				{
					_id: "id_2",
					name: "Test Link 2",
				},
				{
					_id: "id_3",
					node_type: "link",
					url: "/",
					display_name: "Link Text 3",
				},
				{
					_id: "id_4",
					node_type: "link",
					url: "/",
					display_name: "Link Text 4",
				},
				{
					_id: "id_5",
					node_type: "link",
					url: "/",
					display_name: "Link Text 5",
				},
				{
					_id: "id_6",
					node_type: "link",
					url: "/",
					display_name: "Link Text 6",
				},
				{
					_id: "id_7",
					node_type: "link",
					url: "/",
					display_name: "Link Text 7",
				},
				{
					_id: "id_8",
					node_type: "link",
					url: "/",
					display_name: "Link Text 8",
				},
				{
					_id: "id_9",
					node_type: "link",
					url: "/",
					display_name: "Link Text 9",
				},
				{
					_id: "id_10",
					node_type: "link",
					url: "/",
					display_name: "Link Text 10",
				},
			],
		},
	};

	return mocks[query.hierarchy] || mocks.noData;
};
