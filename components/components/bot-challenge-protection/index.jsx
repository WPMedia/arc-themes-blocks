import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PropTypes from "prop-types";

import useIdentity from "../../utils/hooks/use-identity";
import Paragraph from "../paragraph";
import useRecaptcha, { RECAPTCHA_V2, RECAPTCHA_V3 } from "../../utils/hooks/use-reCaptcha";
import RecaptchaV3 from "./reCaptchaV3";
import { ARCXP_CAPTCHA } from "./constants";

const COMPONENT_CLASS_NAME = "c-reCaptcha";

const BotChallengeProtection = ({
	challengeIn,
	setCaptchaToken,
	captchaError,
	error,
	setCaptchaError,
	resetRecaptcha,
}) => {
	const { isInitialized } = useIdentity();
	const { recaptchaVersion, siteKey, isRecaptchaEnabled } = useRecaptcha(challengeIn);

	const recaptchaRef = useRef();

	useEffect(() => {
		if (isRecaptchaEnabled && recaptchaVersion === RECAPTCHA_V2 && (captchaError || error)) {
			recaptchaRef.current.reset();
		}
	}, [captchaError, error, isRecaptchaEnabled, recaptchaVersion, resetRecaptcha, recaptchaRef]);

	/* istanbul ignore next */
	const onChange = (value) => {
		setCaptchaToken(value);
		setCaptchaError(null);
		localStorage.setItem(ARCXP_CAPTCHA, value);
	};

	if (!isInitialized) {
		return null;
	}

	if (isRecaptchaEnabled && !!siteKey && !!recaptchaVersion) {
		if (recaptchaVersion === RECAPTCHA_V2) {
			return (
				/* istanbul ignore next */
				<section
					className={COMPONENT_CLASS_NAME}
					data-testid="bot-challege-protection-container-V2"
				>
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey={siteKey}
						onChange={onChange}
						onExpired={() => {}}
					/>
					{captchaError && (
						<Paragraph className={`${COMPONENT_CLASS_NAME}--warning`}>{captchaError}</Paragraph>
					)}
				</section>
			);
		}
		if (recaptchaVersion === RECAPTCHA_V3) {
			return (
				/* istanbul ignore next */
				<section data-testid="bot-challege-protection-container-V3">
					<GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true }}>
						<RecaptchaV3 setCaptchaToken={setCaptchaToken} resetRecaptcha={resetRecaptcha} />
					</GoogleReCaptchaProvider>
				</section>
			);
		}
	} else {
		return null;
	}

	return null;
};

BotChallengeProtection.propTypes = {
	/** Variant where the bothChallenge could appear. */
	challengeIn: PropTypes.oneOf(["signin", "signup", "magicLink", "checkout"]),
	/** Function to save the reCaptcha token */
	setCaptchaToken: PropTypes.func.isRequired,
	/** String value, message when Captcha challenge is not completed */
	captchaError: PropTypes.string,
	/** String value with the error message returned by the BE, BE don't accept the same token more than a single time */
	error: PropTypes.string,
	/** Function to set the reCaptcha error */
	setCaptchaError: PropTypes.func.isRequired,
	/** Boolean value, when changing reCaptcha V3 is obtained again */
	resetRecaptcha: PropTypes.bool.isRequired,
};

export default BotChallengeProtection;
