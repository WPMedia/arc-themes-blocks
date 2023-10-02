import React, { createContext, useEffect, useState } from "react";

export const GoogleSignInContext = createContext();

const { Provider } = GoogleSignInContext;

export const GoogleSignInProvider = ({ children }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	// istanbul ignore next
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.defer = true;
		script.async = true;
		script.onload = () => {
			setIsLoaded(true);
		};
		script.onerror = () => {
			setIsLoaded(false);
		};

		if (!isLoaded) {
			document?.body?.appendChild?.(script);
		}

		return () => {
			if (document?.body?.contains(script)) {
				document?.body?.removeChild?.(script);
			}
		};
	}, [isLoaded]);

	return <Provider value={{ isGoogleLoaded: isLoaded }}>{children}</Provider>;
};
