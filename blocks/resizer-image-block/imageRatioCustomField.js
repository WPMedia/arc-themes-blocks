import PropTypes from "@arc-fusion/prop-types";

const imageRatioLabels = {
	"16:9": "16:9",
	"3:2": "3:2",
	"4:3": "4:3",
};

const imageRatiosKeys = Object.keys(imageRatioLabels);

/**
 * Helper to create imageRatio properties to be used on CustomFields
 *
 * example usage:
 *
 *   customFields: PropTypes.shape({
 *    ...imageRatioProps('imageRatioMD', 'Medium story settings', '16:9'),
 *  });
 *
 *
 * @param element Base name of the element.
 * @param group Group to witch the element belong to
 * @param defaultValue Default value to use for this property
 *
 * @return A property object to be use on CustomFields
 */
const imageRatioCustomField = (element, group, defaultValue) => {
	const elementTextProp = {
		[`${element}`]: PropTypes.oneOf(imageRatiosKeys).tag({
			labels: imageRatioLabels,
			name: "Image ratio",
			defaultValue,
			group,
		}),
	};
	return { ...elementTextProp };
};

export default imageRatioCustomField;
