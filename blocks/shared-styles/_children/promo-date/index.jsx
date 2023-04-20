import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import { localizeDateTime } from "@wpmedia/arc-themes-components";
import PrimaryFont from "../primary-font";

import "./index.scss";

const PromoDate = (props) => {
	const { content = {}, date, className = "" } = props;
	const { arcSite } = useFusionContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateFormat: "%B %d, %Y 'at' K:m bbbb z",
		},
	} = getProperties(arcSite);

	const displayDate = content?.display_date || date;
	const formattedDate =
		displayDate && Date.parse(displayDate)
			? localizeDateTime(new Date(displayDate), dateTimeFormat, language, timeZone)
			: "";

	return displayDate ? (
		<PrimaryFont as="time" className={`promo-date ${className}`} dateTime={displayDate}>
			{formattedDate}
		</PrimaryFont>
	) : null;
};

export default PromoDate;
