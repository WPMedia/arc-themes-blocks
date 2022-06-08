import React from "react";
import SingleColumnRegularLayout from "./default";

export default {
	title: "Layouts/Single Column Regular Layout",
	parameters: {
		chromatic: { viewports: [320, 768, 1600] },
	},
};

// some styling to make the appearance more apparent

const styles = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "15vh",
	backgroundColor: "rgb(240 240 240)",
	border: "1px solid rgb(200, 200, 200)",
};

const Navigation = () => <div style={styles}>Navigation</div>;
const Component = ({ children }) => <div style={styles}>{children}</div>;
const Footer = () => <div style={styles}>Footer</div>;

export const oneChildInBody = () => (
	<SingleColumnRegularLayout
		children={[
			Navigation,
			null,
			<>
				<Component>Body 1</Component>
			</>,
			Footer,
		]}
	/>
);

export const childrenInBody = () => (
	<SingleColumnRegularLayout>
		<Navigation />
		<>
			<Component>Body 1</Component>
			<Component>Body 2</Component>
			<Footer />
		</>
	</SingleColumnRegularLayout>
);

export const oneChildInFullWidthAndBody = () => (
	<SingleColumnRegularLayout>
		<Navigation />
		<>
			<Component>Body 1</Component>
		</>
		<>
			<Component>Full Width 1</Component>
		</>
		<Footer />
	</SingleColumnRegularLayout>
);

export const childrenInFullWidthAndBody = () => (
	<SingleColumnRegularLayout>
		<Navigation />
		<>
			<Component>Body 1</Component>
			<Component>Body 2</Component>
		</>
		<>
			<Component>Full Width 1</Component>
			<Component>Full Width 2</Component>
		</>
		<Footer />
	</SingleColumnRegularLayout>
);
