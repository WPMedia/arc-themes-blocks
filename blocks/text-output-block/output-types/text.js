import PropTypes from "prop-types";

const TextOutputType = ({ children }) => {
	const generateText = (child) => {
		if (Array.isArray(child)) return child.map(generateText).join("\n");
		return child;
	};
	return generateText(children);
};

TextOutputType.contentType = "text/plain";
TextOutputType.fallback = false;

TextOutputType.propTypes = {
	children: PropTypes.node,
};

export default TextOutputType;
