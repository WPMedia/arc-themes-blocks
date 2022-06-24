import React, { useEffect } from "react";

const useCustomEvent = (eventName, eventListener, dependencies = []) => {
	useEffect(() => {
		if (window && eventName && eventListener) {
			window.addEventListener(eventName, eventListener);
			return () => {
				window.removeEventListener(eventName, eventListener);
			};
		}
	}, dependencies);

	return (eventName = eventName, detail) => {
		window?.dispatchEvent(new CustomEvent(eventName, { detail }));
	};
};

export default useCustomEvent;
