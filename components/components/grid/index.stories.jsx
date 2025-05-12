import Grid from ".";

export default {
	title: "Components/Grid",
	component: Grid,
};

export const DefaultGrid = {
	render: () => (
		<Grid>
			<div
				style={{
					height: "250px",
					width: "100%",
					backgroundColor: "rebeccapurple",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "100%",
					backgroundColor: "antiquewhite",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "100%",
					backgroundColor: "rebeccapurple",
				}}
			/>
		</Grid>
	),

	name: "Grid",
};
