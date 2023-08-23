import React from "react";
import ArcSiwgContextProvider from "@arcxp/react-sign-in-with-google/lib/esm/ArcSiwgProvider";
import ArcSiwgButton from "@arcxp/react-sign-in-with-google/lib/esm/ArcSiwgButton";
import useIdentity from "../../identity";

const GoogleSignInButton = () => (
	<ArcSiwgButton
		gsiButtonConfiguration={{
			type: "standard",
			theme: "outline",
			size: "large",
			text: "signin_with",
			shape: "rectangular",
			logo_alignment: "left",
			width: "300",
		}}
	/>
);

const GoogleSignIn = ({ onError, redirectURL }) => {
	const { Identity } = useIdentity();
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
