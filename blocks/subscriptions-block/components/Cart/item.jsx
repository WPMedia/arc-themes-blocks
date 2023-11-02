import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Stack } from "@wpmedia/arc-themes-components";

const Item = ({ name, description, additionalInfo, className }) => (
	<Stack as="div" className={`${className}__cart-item`}>
		<p className={`${className}__cart-item--name`}>{name}</p>
		{description ? (
			<p
				className={`${className}__cart-item--description`}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		) : null}
		{additionalInfo ? <p className={`${className}__cart-item--info`}>{additionalInfo}</p> : null}
	</Stack>
);

Item.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	additionalInfo: PropTypes.string,
};

export default Item;