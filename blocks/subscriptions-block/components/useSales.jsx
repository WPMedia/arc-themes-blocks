import { useState } from "react";
import Identity from "@arc-publishing/sdk-identity";
import Sales from "@arc-publishing/sdk-sales";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

const useSales = () => {
	const { arcSite } = useFusionContext();
	const { api } = getProperties(arcSite);
	const [isInit, setIsInit] = useState(!!Identity.apiOrigin);

	if (!isInit && arcSite && api?.identity?.origin) {
		Identity.options({ apiOrigin: api.identity.origin });

		Sales.options({
			apiOrigin: api?.retail?.origin,
			Identity,
		});

		setIsInit(true);
	}

	return {
		Sales,
		isInitialized: isInit,
	};
};

export default useSales;
