import React, { useState, useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Paragraph, useIdentity } from "@wpmedia/arc-themes-components";
import useSales from "../../utils/useSales";
import ReCAPTCHA from "react-google-recaptcha";


const BotChallengeProtection = ({ challengeIn, setCaptchaToken }) => {
	const { Identity, isInitialized } = useIdentity();
  const { Sales } = useSales();
	const [siteKey, setSiteKey] = useState();
	console.log('siteKey', siteKey)

	const onChange = (value) => {
		setCaptchaToken(value);
    localStorage.setItem('captchaToken', captchaToken);

		console.log("Captcha value:", value);
	};

	useEffect(() => {
		const checkCaptcha = async () => {
			const config = await Identity.getConfig();
			const {recaptchaSiteKey, recaptchaScore } = config;
			const isIdentityCaptchaEnabled = config?.[`${challengeIn}Recaptcha`];

			if(['signup', 'signin', 'magicLink'].includes(challengeIn)) {
				if (isIdentityCaptchaEnabled && recaptchaScore === '-1' && recaptchaSiteKey) {
					setSiteKey(recaptchaSiteKey);
				}
			}

			if (challengeIn === 'checkout') {
				const salesConfig = await Sales.getConfig();
				const isSalesCaptchaEnabled = salesConfig?.checkoutRecaptchaEnabled;
				if (isSalesCaptchaEnabled && recaptchaScore === '-1' && recaptchaSiteKey) {
					setSiteKey(recaptchaSiteKey);
				}
			}

		};
		checkCaptcha();
		
	}, []);

  // if(['signup', 'signin', 'magicLink'].includes(challengeIn)) {
  //   Identity.getConfig().then(config => {
	// 		const {recaptchaSiteKey, recaptchaScore } = config;
	// 		const isCaptchaEnabled = config?.[`${challengeIn}Recaptcha`];

	// 		if (isCaptchaEnabled) {
	// 			if (isCaptchaEnabled && recaptchaScore === '-1' && recaptchaSiteKey) {
	// 				// v2 logic
	// 				setSiteKey(recaptchaSiteKey);
	// 			}
	// 		}
	// 	});
  // };

  // if (challengeIn === 'checkout') {
  //   Identity.getConfig().then(config => console.log(config));
  //   Sales.getConfig().then(config => console.log(config));
  // }

	const url_string = window.location.href;
	const url = new URL(url_string);

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const [error, setError] = useState();

	if (!isInitialized) {
		return null;
	}

	return (
		<section data-testid="bot-challege-protection-container">
			Challenge
			{!!siteKey && <ReCAPTCHA
				sitekey={siteKey}
				onChange={onChange}
			/>}
		</section>
	);
};

BotChallengeProtection.propTypes = {
	customFields: PropTypes.shape({
		challengeIn: PropTypes.oneOf(['signup', 'signin', 'magiclink', 'checkout']).tag({
			name: "Challenge In",
			defaultValue: "signup",
		})
	}),
};

export default BotChallengeProtection;
