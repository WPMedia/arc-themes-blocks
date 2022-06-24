import { useEffect } from "react";

const useCustomEvent = (eventName, eventListener) => {
	useEffect(() => {
		if (window && eventName && eventListener) {
			window.addEventListener(eventName, eventListener);
			return () => {
				window.removeEventListener(eventName, eventListener);
			};
		}
	}, [eventListener, eventName]);

	return (customEventName = eventName, detail) => {
		window?.dispatchEvent(new CustomEvent(customEventName, { detail }));
	};
};

export default useCustomEvent;
