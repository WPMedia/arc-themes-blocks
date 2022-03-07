function SmallPromoStyles(position = "above", element = "headlineMargin") {
	const imagePositionClassMapping = {
		above: {
			headlineMargin: "margin-md-top",
		},
		below: {
			headlineMargin: "margin-md-bottom",
		},
	};
	return imagePositionClassMapping?.[position]?.[element] || "";
}
export default SmallPromoStyles;
