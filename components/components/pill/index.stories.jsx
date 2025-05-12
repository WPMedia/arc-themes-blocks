import Pill from ".";

export default {
	title: "Components/Pill",
	component: Pill,
};

export const DefaultPill = {
	render: () => <Pill>Pill Text</Pill>,
	name: "Pill",
};

export const ManyPills = {
	render: () => (
		<>
			<Pill>
				Pill 1{" "}
				<span role="img" aria-label="pill">
					💊
				</span>
			</Pill>
			<Pill>
				Pill 2{" "}
				<span role="img" aria-label="pill">
					💊
				</span>
			</Pill>
			<Pill>
				Pill 3{" "}
				<span role="img" aria-label="pill">
					💊
				</span>
			</Pill>
			<Pill>
				Pill 4{" "}
				<span role="img" aria-label="pill">
					💊
				</span>
			</Pill>
		</>
	),
};

export const PillAsHyperlink = {
	render: () => <Pill href="./">Pill Text as a Hyperlink</Pill>,
};
