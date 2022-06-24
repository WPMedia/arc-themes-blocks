import { useEffect } from "react";

const useCustomEvent = (eventName, eventListener, dependencies = []) => {
	useEffect(() => {
		if (window && eventName && eventListener) {
			window.addEventListener(eventName, eventListener);
			return () => {
				window.removeEventListener(eventName, eventListener);
			};
		}
	}, [...dependencies, eventListener, eventName]);

	return (customEventName = eventName, detail) => {
		window?.dispatchEvent(new CustomEvent(customEventName, { detail }));
	};
};

export default useCustomEvent;
