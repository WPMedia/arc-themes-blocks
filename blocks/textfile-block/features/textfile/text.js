import PropTypes from "prop-types";

// capital Text used here because (Jason Young: editor saves that key into their db)
// This file was changed from a jsx to js file
const Textfile = ({ customFields }) => {
	const { Text = "" } = customFields || {};
	return Text;
};

Textfile.label = "Text File – Arc Block";

Textfile.icon = "notes-paper-text";

Textfile.propTypes = {
	customFields: PropTypes.shape({
		// eslint-disable-next-line react/no-typos
		Text: PropTypes.richtext,
	}),
};

export default Textfile;
