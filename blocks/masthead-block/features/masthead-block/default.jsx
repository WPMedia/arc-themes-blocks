import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import getProperties from "fusion:properties";
import { useFusionContext } from "fusion:context";

import { Link, localizeDate, Paragraph, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-masthead";

// takes in a date from parent
export const MastheadPresentational = (props) => {
	const {
		customFields: { tagLine, promoLinkURL, promoLinkText, logoURL, showDate },
		displayDate,
	} = props;

	return (
		<Stack className={BLOCK_CLASS_NAME}>
			{logoURL ? (
				<div className={`${BLOCK_CLASS_NAME}__logo`}>
					<img src={logoURL} alt="Masthead logo" />
				</div>
			) : null}
			<div className={`${BLOCK_CLASS_NAME}__content`}>
				<Paragraph className={`${BLOCK_CLASS_NAME}__date`}>
					{showDate ? <>{displayDate}</> : null}
				</Paragraph>
				<Paragraph className={`${BLOCK_CLASS_NAME}__tagline`}>
					{tagLine ? <>{tagLine}</> : null}
				</Paragraph>
				<div className={`${BLOCK_CLASS_NAME}__link`}>
					{promoLinkURL && promoLinkText ? (
						<Link href={promoLinkURL} className="masthead-block--text masthead-block--promo-link">
							{promoLinkText}
						</Link>
					) : null}
				</div>
			</div>
		</Stack>
	);
};

// need to get current time and format
const MastheadContainer = (props) => {
	const { arcSite } = useFusionContext();
	const {
		dateLocalization: { language, timeZone, dateFormat } = {
			language: "en",
			timeZone: "GMT",
			dateFormat: "%B %d, %Y",
		},
	} = getProperties(arcSite);

	const displayDate = localizeDate(new Date(), dateFormat, language, timeZone);

	return <MastheadPresentational {...props} displayDate={displayDate} />;
};

MastheadContainer.label = "Masthead – Arc Block";

MastheadContainer.icon = "arc-masthead";

MastheadContainer.propTypes = {
	customFields: PropTypes.shape({
		logoURL: PropTypes.string.tag({
			label: "Logo URL",
			default: "",
		}),
		tagLine: PropTypes.string.tag({
			label: "Tag Line",
			default: "",
		}),
		showDate: PropTypes.bool.tag({
			label: "Show Date",
			default: false,
		}),
		promoLinkURL: PropTypes.string.tag({
			label: "Promo Link URL",
			default: "",
		}),
		promoLinkText: PropTypes.string.tag({
			label: "Promo Link Text",
			default: "",
		}),
	}),
};

export default MastheadContainer;
