import React, { useState, useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Paragraph, useIdentity, useSales } from "@wpmedia/arc-themes-components";
import ReCAPTCHA from "react-google-recaptcha";

const BotChallengeProtection = ({ challengeIn, setCaptchaToken, className, captchaError }) => {
	const { Identity, isInitialized } = useIdentity();
  const { Sales } = useSales();
	const [siteKey, setSiteKey] = useState();

	const onChange = (value) => {
		setCaptchaToken(value);
    localStorage.setItem('captchaToken', captchaToken);
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

	const url_string = window.location.href;
	const url = new URL(url_string);

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	if (!isInitialized) {
		return null;
	}

	return (
		<section className={`${className}__bot-protection-section`} data-testid="bot-challege-protection-container">
			{!!siteKey && <ReCAPTCHA
				sitekey={siteKey}
				onChange={onChange}
			/>}
			{captchaError && <Paragraph>{phrases.t("identity-block.bot-protection-error")}</Paragraph>}
		</section>
	);
};

export default BotChallengeProtection;
