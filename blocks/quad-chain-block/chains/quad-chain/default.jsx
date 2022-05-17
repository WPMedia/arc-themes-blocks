import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, HeadingSection, Stack, Grid } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-quad-chain";

const QuadChain = ({ children, customFields }) => {
	if (children && children.length && children.length > 0) {
		// if no columnOne length set, then use the length of the children
		// if no length set, then all children will be put in column one
		const {
			columnOne: columnOneLength = children.length,
			columnTwo: columnTwoLength = 0,
			columnThree: columnThreeLength = 0,
			heading = null,
		} = customFields;

		// check column length not negative
		if (columnOneLength >= 0 && columnTwoLength >= 0 && columnThreeLength >= 0) {
			const endOfColumnTwoIndex = columnOneLength + columnTwoLength;

			const endOfColumnThreeIndex = endOfColumnTwoIndex + columnThreeLength;

			const childrenOutput = (
				<Grid className={`${BLOCK_CLASS_NAME}__children-grid`}>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(0, columnOneLength)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(columnOneLength, endOfColumnTwoIndex)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(endOfColumnTwoIndex, endOfColumnThreeIndex)}
					</Stack>
					<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__child-item`}>
						{children.slice(endOfColumnThreeIndex)}
					</Stack>
				</Grid>
			);

			return (
				<Stack direction="vertical" className={BLOCK_CLASS_NAME}>
					{heading ? (
						<HeadingSection>
							<Heading className={`${BLOCK_CLASS_NAME}__heading`}>{heading}</Heading>
						</HeadingSection>
					) : null}
					{childrenOutput}
				</Stack>
			);
		}
	}

	return null;
};

QuadChain.label = "Quad Chain – Arc Block";

QuadChain.icon = "arc-quad-chain";

QuadChain.propTypes = {
	children: PropTypes.array,
	customFields: PropTypes.shape({
		heading: PropTypes.string.tag({
			label: "Heading",
		}),
		columnOne: PropTypes.number.isRequired.tag({
			label: "Number of blocks in Column 1:",
			description: "The number of features which will appear in the first column",
			default: 0,
		}),
		columnTwo: PropTypes.number.isRequired.tag({
			label: "Number of blocks in Column 2",
			description: "The number of features which will appear in the second column",
			default: 0,
		}),
		columnThree: PropTypes.number.isRequired.tag({
			label: "Number of blocks in Column 3",
			description:
				"The number of features which will appear in the third column. The rest will go into the fourth column.",
			default: 0,
		}),
	}),
};

export default QuadChain;
