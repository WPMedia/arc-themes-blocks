import { useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const RecaptchaV3 = ({ setCaptchaToken, resetRecaptcha }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleReCaptcha3Verify = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log("ArcXP - Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha();
		setCaptchaToken(token);
		localStorage.setItem("captchaToken", token);
	}, [executeRecaptcha]);

	useEffect(() => {
		handleReCaptcha3Verify();
	}, [executeRecaptcha, resetRecaptcha]);

	return null;
};

export default RecaptchaV3;
