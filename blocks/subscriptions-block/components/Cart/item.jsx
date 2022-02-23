import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { PrimaryFont } from "@wpmedia/shared-styles";

const Item = ({ name, description, additionalInfo }) => (
	<PrimaryFont as="div" className="xpmedia-subscriptions-cart-item">
		<p className="xpmedia-subscriptions-cart-item--name">{name}</p>
		{description ? (
			<p
				className="xpmedia-subscriptions-cart-item--description"
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		) : null}
		{additionalInfo ? (
			<p className="xpmedia-subscriptions-cart-item--info">{additionalInfo}</p>
		) : null}
	</PrimaryFont>
);

Item.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	additionalInfo: PropTypes.string,
};

export default Item;
