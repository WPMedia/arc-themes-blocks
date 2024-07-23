import React from "react";
import AppleSignIn from "./AppleSignIn";

function OIDCSignin({ customButtons, socialSignOnIn, className, oidcClients }) {

	return (
		oidcClients.map((client) => {
			if (client?.protocol === "Apple") {
				return (
					<AppleSignIn
						customButtons={customButtons}
						socialSignOnIn={socialSignOnIn}
						className={className}
						OidcClient={client}
					/>
				);
			}

			return null;
		})
	);
}

export default OIDCSignin;
