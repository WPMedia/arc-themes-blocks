import PropTypes from "prop-types";
import LevelContext from "../context";

const HeadingSection = ({ children }) => (
	<LevelContext.Consumer>
		{(level) => <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>}
	</LevelContext.Consumer>
);

HeadingSection.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default HeadingSection;
