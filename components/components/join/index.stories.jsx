import Join from ".";

const Separator = () => <> • </>;

export default {
	title: "Components/Join",
	component: Join,
};

export const JoinWithMultipleChildren = {
	render: () => (
		<Join separator={Separator}>
			<span>List Item 1</span>
			<span>List Item 2</span>
			<span>List Item 3</span>
		</Join>
	),
};

export const JoinWithOnlyOneItem = {
	render: () => (
		<Join separator={Separator}>
			<span>List Item 1</span>
		</Join>
	),
};
