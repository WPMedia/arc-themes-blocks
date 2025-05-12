import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-date";

const Date = ({ className, dateString, dateTime, ...rest }) => (
	<time
		{...rest}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		dateTime={dateTime}
	>
		{dateString}
	</time>
);

Date.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The human-readable text that will be displayed within the component */
	dateString: PropTypes.string.isRequired,
	/**
	 * The date and time of the dateString passed in. This must be a valid machine-readable datetime value
	 * This value should be in an ISO 8601 format.
	 */
	dateTime: PropTypes.string.isRequired,
};

export default Date;
