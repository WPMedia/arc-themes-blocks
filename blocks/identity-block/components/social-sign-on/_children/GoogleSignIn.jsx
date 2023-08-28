import React from "react";
import ArcSiwgContextProvider from "@arcxp/react-sign-in-with-google/lib/ArcSiwgProvider";
import ArcSiwgButton from "@arcxp/react-sign-in-with-google/lib/ArcSiwgButton";
import useIdentity from "../../identity";

const GoogleSignInButton = () => (
	<ArcSiwgButton
		gsiButtonConfiguration={{
			type: "standard",
			theme: "outline",
			size: "large",
			text: "continue_with",
			shape: "rectangular",
			logo_alignment: "left",
			width: "300",
		}}
	/>
);

const GoogleSignIn = ({ onError, redirectURL }) => {
	const { Identity } = useIdentity();
	/* istanbul ignore next */
	return (
		<ArcSiwgContextProvider
			arcIdentity={Identity}
			displayOneTap
			onLoginSuccess={() => {
				window.location = redirectURL;
			}}
			onLoginFailure={() => {
				onError();
			}}
			googleIdConfiguration={{
				auto_select: true,
			}}
		>
			<GoogleSignInButton />
		</ArcSiwgContextProvider>
	);
};

export default GoogleSignIn;
