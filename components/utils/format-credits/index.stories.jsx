import formatCredits from ".";

export default {
	title: "Utilities/Format Credits",
	component: formatCredits,
};

export const NoCredit = {
	render: () => <div>{formatCredits()}</div>,

	name: "No credit",
};

export const OneCreatorOneAffiliation = {
	render: () => (
		<div>
			{formatCredits({
				by: [
					{
						name: "Joe Doe",
					},
				],

				affiliation: [
					{
						name: "Stock Photo",
					},
				],
			})}
		</div>
	),

	name: "One creator, one affiliation",
};

export const WithManyAffiliations = {
	render: () => (
		<div>
			{formatCredits({
				affiliation: [
					{
						name: "Stock Photo",
					},
					{
						name: "Creative Commons",
					},
					{
						name: "Yet Another Stock Photo",
					},
				],
			})}
		</div>
	),

	name: "With many affiliations",
};

export const WithManyNameCredits = {
	render: () => (
		<div>
			{formatCredits({
				by: [
					{
						name: "Joe Doe",
					},
					{
						name: "Jane Doe",
					},
					{
						name: "John Doe",
					},
				],
			})}
		</div>
	),

	name: "With many name credits",
};

export const WithOnlyAffiliation = {
	render: () => (
		<div>
			{formatCredits({
				affiliation: [
					{
						name: "Stock Photo",
					},
				],
			})}
		</div>
	),

	name: "With only affiliation",
};

export const WithOnlyAName = {
	render: () => (
		<div>
			{formatCredits({
				by: [
					{
						name: "Joe Doe",
					},
				],
			})}
		</div>
	),

	name: "With only a name",
};
