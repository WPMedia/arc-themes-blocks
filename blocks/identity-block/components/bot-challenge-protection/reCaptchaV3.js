import { useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ARCXP_CAPTCHA } from "./index";

const RecaptchaV3 = ({ setCaptchaToken, resetRecaptcha }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleReCaptcha3Verify = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log("ArcXP - Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha();
		setCaptchaToken(token);
		localStorage.setItem(ARCXP_CAPTCHA, token);
	}, [executeRecaptcha]);

	useEffect(() => {
		handleReCaptcha3Verify();
	}, [executeRecaptcha, resetRecaptcha]);

	return null;
};

export default RecaptchaV3;
