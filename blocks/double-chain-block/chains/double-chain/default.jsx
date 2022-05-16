import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, HeadingSection, Stack, Grid } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-double-chain";

const DoubleChain = ({ children, customFields }) => {
	if (children && children.length && children.length > 0) {
		// if no columnOne length set, then use the length of the children
		// if no length set, then all children will be put in column one
		const { columnOne: columnOneLength = children.length, heading = null } = customFields;

		// check column one length not negative
		if (columnOneLength > 0) {
			const childrenOutput = (
				<Grid className={`${BLOCK_CLASS_NAME}__children-grid`}>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(0, columnOneLength)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(columnOneLength)}
					</Stack>
				</Grid>
			);

			return (
				<Stack direction="vertical" className={BLOCK_CLASS_NAME}>
					<HeadingSection>
						{heading ? (
							<Heading className={`${BLOCK_CLASS_NAME}__heading`}>{heading}</Heading>
						) : null}
						{childrenOutput}
					</HeadingSection>
				</Stack>
			);
		}
	}

	return null;
};

DoubleChain.label = "Double Chain – Arc Block";

DoubleChain.icon = "arc-double-chain";

DoubleChain.propTypes = {
	children: PropTypes.array,
	customFields: PropTypes.shape({
		heading: PropTypes.string.tag({
			label: "Heading",
		}),
		columnOne: PropTypes.number.isRequired.tag({
			label: "Column one size",
			description:
				"The number of features which will appear in the first column. The rest will go into the second column.",
		}),
	}),
};

export default DoubleChain;
