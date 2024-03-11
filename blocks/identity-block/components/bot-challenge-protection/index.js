import React from "react";
import { useIdentity } from "@wpmedia/arc-themes-components";
import useRecaptcha, { RECAPTCHA_V2, RECAPTCHA_V3 } from "../../utils/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RecaptchaV3 from "./reCaptchaV3";

const BotChallengeProtection = ({ challengeIn, setCaptchaToken, className, resetRecaptcha }) => {
	const { isInitialized } = useIdentity();
	const { recaptchaVersion, siteKey, isRecaptchaEnabled } = useRecaptcha(challengeIn);

	const onChange = (value) => {
		setCaptchaToken(value);
		localStorage.setItem("captchaToken", value);
	};

	if (!isInitialized) {
		return null;
	}

	if (isRecaptchaEnabled && !!siteKey && !!recaptchaVersion) {
		if (recaptchaVersion === RECAPTCHA_V2) {
			return (
				<section
					className={`${className}__bot-protection-section`}
					data-testid="bot-challege-protection-container"
				>
					<ReCAPTCHA sitekey={siteKey} onChange={onChange} />
				</section>
			);
		}
		if (recaptchaVersion === RECAPTCHA_V3) {
			return (
				<GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true }}>
					<RecaptchaV3 setCaptchaToken={setCaptchaToken} resetRecaptcha={resetRecaptcha} />
				</GoogleReCaptchaProvider>
			);
		}
	} else {
		return null;
	}
};

export default BotChallengeProtection;
