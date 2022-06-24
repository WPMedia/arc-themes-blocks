export const dispatchEvent = (eventName, detail) => {
	window?.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const addEventListener = (eventName, eventListener) => {
	window?.addEventListener(eventName, eventListener);
};

export const removeEventListener = (eventName, eventListener) => {
	window?.removeEventListener(eventName, eventListener);
};
