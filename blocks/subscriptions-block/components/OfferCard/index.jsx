import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, Button, Stack, Paragraph, Icon } from "@wpmedia/arc-themes-components";

export const FeatureDetails = ({ features, className }) => {
	if (features && features?.length) {
		return (
			<ul className={`${className}__card--features`}>
				{features.map((feat) => (
					<li
						className={`${className}__card--features--feature-item`}
						key={`feat-${feat.featureText}`}
					>
						<Icon name="Check" />
						<span dangerouslySetInnerHTML={{ __html: feat.featureText }} />
					</li>
				))}
			</ul>
		);
	}
	return null;
};

const OfferCard = ({
	headline,
	subHeadline,
	actionText,
	actionEvent,
	features = [],
	className,
}) => (
	<Stack as="div" className={`${className}__card`}>
		{headline ? <Heading dangerouslySetInnerHTML={{ __html: headline }} /> : null}

		{subHeadline ? <Paragraph dangerouslySetInnerHTML={{ __html: subHeadline }} /> : null}

		{actionText && actionEvent ? (
			<Button size="large" variant="primary" fullWidth onClick={actionEvent}>
				<span dangerouslySetInnerHTML={{ __html: actionText }} />
			</Button>
		) : null}

		<FeatureDetails features={features} className={className} />
	</Stack>
);

OfferCard.propTypes = {
	headline: PropTypes.string,
	subHeadline: PropTypes.string,
	actionText: PropTypes.string,
	actionEvent: PropTypes.func,
	features: PropTypes.arrayOf(
		PropTypes.shape({
			featureText: PropTypes.string,
		}),
	),
};

export default OfferCard;
