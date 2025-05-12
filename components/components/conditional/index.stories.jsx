import Stack from "../stack";
import Link from "../link";

import Conditional from ".";

export default {
	title: "Components/Conditional",
	component: Conditional,
};

export const DefaultConditional = {
	render: () => (
		<Stack>
			<Conditional component={Link} condition href="/" openInNewTab>
				Condition is truthy so outputs using `component` property
			</Conditional>
			<Conditional component={Link} condition={false} href="/">
				Will render children only as condition is false
			</Conditional>
		</Stack>
	),

	name: "Conditional",
};
