import { Fragment } from "react";

// Join based on rules for serial comma use (aka. Oxford comma)

const serialJoin = (list = [], conjunction = "and", delimiter = ",", spacer = " ") =>
	list
		.filter(
			(item) => typeof item !== "undefined" && item !== null && Object.keys(item).length !== 0
		)
		.map((item, index, { length }) => (
			/* eslint-disable-next-line react/no-array-index-key */
			<Fragment key={`${item}_${index}`}>
				{length > 1 && index === length - 1 ? (
					<>
						{conjunction}
						{spacer}
					</>
				) : null}
				{item}
				{length > 2 && index !== length - 1 ? delimiter : null}
				{index !== length - 1 ? spacer : null}
			</Fragment>
		));

export default serialJoin;
