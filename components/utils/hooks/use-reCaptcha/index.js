import { useState, useMemo } from "react";
import fetch from "node-fetch";
import useIdentity from "../use-identity";
import useSales from "../use-sales";

// eslint-disable-next-line
globalThis.fetch = fetch;

export const RECAPTCHA_CHECKOUT = "checkout";
export const RECAPTCHA_LOGIN = "signin";
export const RECAPTCHA_MAGICLINK = "magicLink";
export const RECAPTCHA_SIGNUP = "signup";

export const RECAPTCHA_V2 = "V2";
export const RECAPTCHA_V3 = "V3";

const useRecaptcha = (challengeIn) => {
	const { Identity } = useIdentity();
	const { Sales, isInitialized: isSalesInitialized } = useSales();

	const [recaptchaVersion, setRecaptchaVersion] = useState();
	const [siteKey, setSiteKey] = useState();
	const [isRecaptchaEnabled, setIsRecaptchaEnabled] = useState(false);

	const setRecaptchaInfo = (isCaptchaEnabled, recaptchaSiteKey, recaptchaScore) => {
		if (isCaptchaEnabled && recaptchaSiteKey && !!String(recaptchaScore)) {
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
		if (isSalesInitialized) {
			const identityConfig = await Identity.getConfig();
			const { recaptchaSiteKey, recaptchaScore } = identityConfig;
			if ([RECAPTCHA_LOGIN, RECAPTCHA_SIGNUP, RECAPTCHA_MAGICLINK].includes(challengeIn)) {
				const isIdentityCaptchaEnabled = identityConfig?.[`${challengeIn}Recaptcha`];
				setRecaptchaInfo(isIdentityCaptchaEnabled, recaptchaSiteKey, recaptchaScore);
			}

			if (challengeIn === RECAPTCHA_CHECKOUT) {
				const salesConfig = await Sales.getConfig();
				const isSalesCaptchaEnabled = salesConfig?.checkoutRecaptchaEnabled;
				setRecaptchaInfo(isSalesCaptchaEnabled, recaptchaSiteKey, recaptchaScore);
			}
		}
	};

	useMemo(
		() => checkCaptcha(),
		/* eslint-disable-next-line */
		[challengeIn, isSalesInitialized],
	);

	return {
		recaptchaVersion,
		siteKey,
		isRecaptchaEnabled,
	};
};

export default useRecaptcha;
