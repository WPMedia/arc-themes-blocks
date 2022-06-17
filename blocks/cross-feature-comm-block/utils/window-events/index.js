export const dispatchEvent = (eventName, detail) => {
	window?.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const addEventListener = (eventName, eventListener, ...rest) => {
	window?.addEventListener(eventName, eventListener, ...rest);
};

export const removeEventListener = (eventName, eventListener) => {
	window?.removeEventListener(eventName, eventListener);
};
