import LazyLoad from ".";

export default {
	title: "Components/LazyLoad",
	component: LazyLoad,
};

export const Basic = {
	render: () => (
		<div
			style={{
				margin: "30px",
				paddingBottom: "30px",
			}}
		>
			<div
				style={{
					backgroundColor: "blue",
					color: "white",
					textAlign: "center",
					padding: "30px",
					height: "3000px",
					borderRadius: "6px",
					fontFamily: "sans-serif",
					marginBottom: "30px",
				}}
			>
				Scroll down to view lazy-loaded red box
			</div>
			<LazyLoad enabled>
				<div
					style={{
						backgroundColor: "red",
						padding: "30px",
						height: "3000px",
						borderRadius: "6px",
						marginBottom: "30px",
					}}
				/>
			</LazyLoad>
		</div>
	),
};

export const WithCustomFields = {
	render: () => (
		<div
			style={{
				margin: "30px",
				paddingBottom: "30px",
			}}
		>
			<div
				style={{
					backgroundColor: "blue",
					color: "white",
					textAlign: "center",
					padding: "30px",
					height: "3000px",
					borderRadius: "6px",
					fontFamily: "sans-serif",
					marginBottom: "30px",
				}}
			>
				Scroll down to view lazy-loaded red box
			</div>
			<LazyLoad
				enabled
				offsetTop={50}
				offsetBottom={50}
				offsetLeft={0}
				offsetRight={0}
				throttle={50}
			>
				<div
					style={{
						backgroundColor: "red",
						padding: "30px",
						height: "3000px",
						borderRadius: "6px",
						marginBottom: "30px",
					}}
				/>
			</LazyLoad>
		</div>
	),

	name: "With custom fields",
};
