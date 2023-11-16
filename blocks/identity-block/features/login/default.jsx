import React, { useState, useEffect } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Input, useIdentity } from "@wpmedia/arc-themes-components";
import HeadlinedSubmitForm from "../../components/headlined-submit-form";
import useLogin from "../../components/login";

const BLOCK_CLASS_NAME = "b-login-form";

const Login = ({ customFields }) => {
	const { redirectURL, redirectToPreviousPage, loggedInPageLocation, OIDC } = customFields;

	const { isAdmin, arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const { Identity, isInitialized } = useIdentity();

	const [error, setError] = useState();

	const { loginRedirect } = useLogin({
		isAdmin,
		redirectURL,
		redirectToPreviousPage,
		loggedInPageLocation,
	});

	if (!isInitialized) {
		return null;
	}

	async function handleLogin() {
    const url_string = window.location.href;
    const url = new URL(url_string);

    const queryParams = {
      response_type: url.searchParams.get("response_type"),
      scope: url.searchParams.get("scope"),
      state: url.searchParams.get("state"),
      client_id: url.searchParams.get("client_id"),
      redirect_uri: url.searchParams.get("redirect_uri"),
      nonce: url.searchParams.get("nonce"),
      code_challenge: url.searchParams.get("code_challenge"),
      code_challengeMethod: url.searchParams.get("code_challenge_method"),
    }

    const validQueryParams = Object.keys(queryParams).reduce((acc, key)=> {
      if (queryParams[key]) {
        acc[key] = queryParams[key]
      }

      return acc;
    }, {})

    await Identity.loginWithArcIdentityAsOIDCProvider(
      validQueryParams,
    ).catch((err) => {
      setError(err.message)
    });
  }

	useEffect(() => {
		if (OIDC) {
			Identity.isLoggedIn().then(isLoggedIn => {
				if (isLoggedIn) {
					return handleLogin()
				}
			}).catch((err) => {
				setError(err.message)
			})
		}
  }, [])

	return (
		<HeadlinedSubmitForm
			buttonLabel={phrases.t("identity-block.log-in")}
			className={BLOCK_CLASS_NAME}
			formErrorText={error}
			headline={phrases.t("identity-block.log-in")}
			onSubmit={({ email, password }) =>
				Identity.login(email, password)
					.then(() => {
						if (OIDC) {
							handleLogin();
						} else {
							window.location = loginRedirect;
						}
					})
					.catch(() => setError(phrases.t("identity-block.login-form-error")))
			}
		>
			<Input
				autoComplete="email"
				label={phrases.t("identity-block.email")}
				name="email"
				required
				showDefaultError={false}
				type="email"
				validationErrorMessage={phrases.t("identity-block.email-requirements")}
			/>
			<Input
				autoComplete="current-password"
				label={phrases.t("identity-block.password")}
				name="password"
				required
				showDefaultError={false}
				type="password"
			/>
		</HeadlinedSubmitForm>
	);
};

Login.label = "Identity Log In - Arc Block";

Login.propTypes = {
	customFields: PropTypes.shape({
		redirectURL: PropTypes.string.tag({
			name: "Redirect URL",
			defaultValue: "/account/",
		}),
		redirectToPreviousPage: PropTypes.bool.tag({
			name: "Redirect to previous page",
			defaultValue: true,
			description:
				"Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL",
		}),
		loggedInPageLocation: PropTypes.string.tag({
			name: "Logged In URL",
			defaultValue: "/account/",
			description:
				"The URL to which a user would be redirected to if visiting a login page when already logged in.",
		}),
		OIDC: PropTypes.bool.tag({
      name: 'Login with OIDC PKCE',
      defaultValue: false,
      description: 'Used when authenticating a third party site with OIDC PKCE flow. This will use an ArcXp Org as an auth provider',
    }),
	}),
};

export default Login;
