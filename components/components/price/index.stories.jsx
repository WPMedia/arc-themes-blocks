import Price from ".";

export default {
	title: "Components/Price",
	component: Price,
};

export const DefaultPrice = {
	render: () => (
		<Price>
			<Price.Sale>$100</Price.Sale>
			<Price.List>$200</Price.List>
		</Price>
	),

	name: "Price",
};

export const ListPrice = {
	render: () => (
		<Price>
			<Price.List>$200</Price.List>
		</Price>
	),
};

export const SalePrice = {
	render: () => (
		<Price>
			<Price.Sale>$100</Price.Sale>
		</Price>
	),
};
