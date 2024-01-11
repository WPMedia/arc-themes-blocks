import { useState } from "react";
import Identity from "@arc-publishing/sdk-identity";
import Sales from "@arc-publishing/sdk-sales";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

const useSales = () => {
	const { arcSite } = useFusionContext();
	const { api } = getProperties(arcSite);
	const [isInit, setIsInit] = useState(!!Sales.apiOrigin);
	const isIdentityInit = !!Identity.apiOrigin;

	const identityApiOrigin = api?.identity?.origin ?? api?.sales?.origin ?? api?.retail?.origin;
	const salesApiOrigin = api?.sales?.origin ?? api?.identity?.origin ?? api?.retail?.origin;

	if (!isIdentityInit && arcSite && identityApiOrigin) {
		Identity.options({ apiOrigin: identityApiOrigin });
	}

	if (!isInit && arcSite && salesApiOrigin) {
		Sales.options({
			apiOrigin: salesApiOrigin,
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