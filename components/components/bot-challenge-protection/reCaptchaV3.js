import { useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { ARCXP_CAPTCHA } from "./constants";

/* istanbul ignore file */
const RecaptchaV3 = ({ setCaptchaToken, resetRecaptcha }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const handleReCaptcha3Verify = useCallback(async () => {
		if (!executeRecaptcha) {
			// eslint-disable-next-line
			console.log("ArcXP - Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha();
		setCaptchaToken(token);
		localStorage.setItem(ARCXP_CAPTCHA, token);
		/* eslint-disable-next-line */
	}, [executeRecaptcha]);

	useEffect(() => {
		handleReCaptcha3Verify();
		/* eslint-disable-next-line */
	}, [executeRecaptcha, resetRecaptcha]);

	return null;
};

export default RecaptchaV3;
