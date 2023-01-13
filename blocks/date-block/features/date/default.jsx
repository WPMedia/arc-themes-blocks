import React from "react";
import { localizeDateTime } from "@wpmedia/engine-theme-sdk";
import { useAppContext } from "fusion:context";
import getProperties from "fusion:properties";
import { Date as DisplayDate } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-date";

const ArticleDate = () => {
	const { arcSite, globalContent: { display_date: globalDateString } = {} } = useAppContext();
	const {
		dateLocalization: { language, timeZone, dateTimeFormat } = {
			language: "en",
			timeZone: "GMT",
			dateTimeFormat: "%B %d, %Y at %l:%M%p %Z",
		},
	} = getProperties(arcSite);
	const formattedDate =
		globalDateString && Date.parse(globalDateString)
			? localizeDateTime(new Date(globalDateString), dateTimeFormat, language, timeZone)
			: "";

	return (
		<DisplayDate
			as="time"
			className={BLOCK_CLASS_NAME}
			dateTime={globalDateString}
			dateString={formattedDate}
		/>
	);
};

ArticleDate.label = "Date – Arc Block";

ArticleDate.icon = "calendar";

export default ArticleDate;
