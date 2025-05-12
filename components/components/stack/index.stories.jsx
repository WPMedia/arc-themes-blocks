import Stack from ".";

export default {
	title: "Components/Stack",
	component: Stack,
};

export const CustomGap = {
	render: () => (
		<Stack>
			<Stack direction="horizontal" gap="5px">
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "blue",
					}}
				/>
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "red",
					}}
				/>
			</Stack>
			<Stack direction="horizontal" gap="var(--global-spacing-200)">
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "blue",
					}}
				/>
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "red",
					}}
				/>
			</Stack>
			<Stack direction="horizontal" gap="4rem">
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "blue",
					}}
				/>
				<div
					style={{
						height: "250px",
						width: "250px",
						backgroundColor: "red",
					}}
				/>
			</Stack>
		</Stack>
	),
};

export const Default = {
	render: () => <Stack>Stack Text</Stack>,
};

export const Horizontal = {
	render: () => (
		<Stack direction="horizontal">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),
};

export const HorizontalWithDivider = {
	render: () => (
		<Stack direction="horizontal" divider>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with divider",
};

export const HorizontalWithDividerAndCenteredJustification = {
	render: () => (
		<Stack direction="horizontal" divider justification="center">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with divider and centered justification",
};

export const HorizontalWithDividerAndEndJustification = {
	render: () => (
		<Stack direction="horizontal" divider justification="end">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with divider and end justification",
};

export const HorizontalWithNoWrap = {
	render: () => (
		<Stack direction="horizontal" wrap="nowrap">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "violet",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "orange",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "gold",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "pink",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with no wrap",
};

export const HorizontalWithNoWrapAndInlined = {
	render: () => (
		<Stack direction="horizontal" wrap="nowrap" inline>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "violet",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "orange",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "gold",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "pink",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with no wrap and inlined",
};

export const HorizontalWithReverseWrap = {
	render: () => (
		<Stack direction="horizontal" wrap="reverse">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				One
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Two
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Three
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Four
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Five
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Six
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Seven
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Eight
			</div>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "black",
					color: "white",
				}}
			>
				Nine
			</div>
		</Stack>
	),

	name: "Horizontal with reverse wrap",
};

export const HorizontalWithWrapApplied = {
	render: () => (
		<Stack direction="horizontal" wrap="wrap">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "violet",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "orange",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "green",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "gold",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "pink",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
		</Stack>
	),

	name: "Horizontal with wrap applied",
};

export const Vertical = {
	render: () => (
		<Stack>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),
};

export const VerticalCentered = {
	render: () => (
		<Stack alignment="center">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Vertical centered",
};

export const VerticalEndAlignment = {
	render: () => (
		<Stack alignment="end">
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Vertical end alignment",
};

export const VerticalWithDivider = {
	render: () => (
		<Stack divider>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Vertical with divider",
};

export const VerticalWithDividerAndInlined = {
	render: () => (
		<Stack divider inline>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "blue",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "red",
				}}
			/>
			<div
				style={{
					height: "250px",
					width: "250px",
					backgroundColor: "brown",
				}}
			/>
		</Stack>
	),

	name: "Vertical with divider and inlined",
};
