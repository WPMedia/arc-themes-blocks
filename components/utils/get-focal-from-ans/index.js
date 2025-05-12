const getFocalFromANS = (ansImage) => {
	if (ansImage?.focal_point) {
		const { x, y } = ansImage.focal_point;
		if (x && y) {
			return { focal: `${x},${y}` };
		}
	}
	return { smart: true };
};

export default getFocalFromANS;
