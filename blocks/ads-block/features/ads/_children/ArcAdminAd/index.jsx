import React from "react";
import { Paragraph, Stack } from "@wpmedia/arc-themes-components";

const ArcAdminAd = ({ adType, slotName, dimensions }) => (
	<Stack className="b-ads-block--admin">
		<Stack>
			<Paragraph>{adType || "Ad Name N/A"}</Paragraph>
			<Paragraph>{slotName}</Paragraph>
		</Stack>
		<Paragraph>{JSON.stringify(dimensions)}</Paragraph>
	</Stack>
);

export default ArcAdminAd;
