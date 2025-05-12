import PropTypes from "prop-types";

const Button = ({ children, className, id, label, onClick }) => (
	<button
		type="button"
		aria-label={label}
		className={className}
		aria-controls={id}
		onClick={onClick}
	>
		{children}
	</button>
);

Button.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/** Class name gets applied to the component */
	className: PropTypes.string,
	/** id - used to tie the button to the carousel */
	id: PropTypes.string.isRequired,
	/** Accessible label */
	label: PropTypes.string,
	/** Function assigned to the onClick event */
	onClick: PropTypes.func,
};

export default Button;
