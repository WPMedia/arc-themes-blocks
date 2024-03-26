import { useState, useMemo } from "react";
import { useIdentity, useSales } from "@wpmedia/arc-themes-components";

export const RECAPTCHA_LOGIN = "signin";
export const RECAPTCHA_SIGNUP = "signup";
export const RECAPTCHA_MAGICLINK = "magicLink";
export const RECAPTCHA_CHECKOUT = "checkout";

export const RECAPTCHA_V2 = "V2";
export const RECAPTCHA_V3 = "V3";

const useRecaptcha = (challengeIn) => {
	const { Identity } = useIdentity();
	const { Sales } = useSales();

	const [recaptchaVersion, setRecaptchaVersion] = useState();
	const [siteKey, setSiteKey] = useState();
	const [isRecaptchaEnabled, setIsRecaptchaEnabled] = useState(false);

	const setRecaptchaInfo = (isCaptchaEnabled, recaptchaSiteKey, recaptchaScore) => {
		if (isCaptchaEnabled && recaptchaSiteKey && recaptchaScore) {
			if (recaptchaScore === "-1") {
				setSiteKey(recaptchaSiteKey);
				setRecaptchaVersion(RECAPTCHA_V2);
				setIsRecaptchaEnabled(true);
			} else if (parseFloat(recaptchaScore) >= 0 && parseFloat(recaptchaScore) <= 1) {
				setSiteKey(recaptchaSiteKey);
				setRecaptchaVersion(RECAPTCHA_V3);
				setIsRecaptchaEnabled(true);
			}
		}
	};

	const checkCaptcha = async () => {
		const identityConfig = await Identity.getConfig();
		const { recaptchaSiteKey, recaptchaScore } = identityConfig;
		if (["signup", "signin", "magicLink"].includes(challengeIn)) {
			const isIdentityCaptchaEnabled = identityConfig?.[`${challengeIn}Recaptcha`];
			setRecaptchaInfo(isIdentityCaptchaEnabled, recaptchaSiteKey, recaptchaScore);
		}

		if (challengeIn === "checkout") {
			const salesConfig = await Sales.getConfig();
			const isSalesCaptchaEnabled = salesConfig?.checkoutRecaptchaEnabled;
			setRecaptchaInfo(isSalesCaptchaEnabled, recaptchaSiteKey, recaptchaScore);
		}
	};

	useMemo(
		() => checkCaptcha(),
		/* eslint-disable-next-line */
		[challengeIn],
	);

	return {
		recaptchaVersion,
		siteKey,
		isRecaptchaEnabled,
	};
};

export default useRecaptcha;
