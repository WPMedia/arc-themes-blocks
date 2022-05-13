import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, HeadingSection, Stack, Grid } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-triple-chain";

const TripleChain = ({ children, customFields }) => {
	if (children && children.length && children.length > 0) {
		// if no columnOne length set, then use the length of the children
		// if no length set, then all children will be put in column one
		const {
			columnOne: columnOneLength = children.length,
			columnTwo: columnTwoLength = 0,
			heading = null,
		} = customFields;

		// check column length not negative
		if (columnOneLength >= 0 && columnTwoLength >= 0) {
			const endOfColumnTwoIndex = columnOneLength + columnTwoLength;

			const childrenOutput = (
				<Grid className={`${BLOCK_CLASS_NAME}__children-grid`}>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(0, columnOneLength)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(columnOneLength, endOfColumnTwoIndex)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(endOfColumnTwoIndex)}
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

TripleChain.label = "Triple Chain – Arc Block";

TripleChain.icon = "arc-triple-chain";

TripleChain.propTypes = {
	children: PropTypes.array,
	customFields: PropTypes.shape({
		heading: PropTypes.string.tag({
			label: "Heading",
		}),
		columnOne: PropTypes.number.isRequired.tag({
			label: "Number of blocks in Column 1:",
			description: "The number of features which will appear in the first column",
		}),
		columnTwo: PropTypes.number.isRequired.tag({
			label: "Number of blocks in Column 2",
			description:
				"The number of features which will appear in the second column. The rest will go into the third column.",
		}),
	}),
};

export default TripleChain;
