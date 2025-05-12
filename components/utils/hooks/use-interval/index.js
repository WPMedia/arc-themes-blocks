import React from "react";

// via Dan Abramov https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// istanbul ignore next
function useInterval(callback, delay) {
	const intervalRef = React.useRef(null);
	const savedCallback = React.useRef(callback);
	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	// eslint-disable-next-line consistent-return
	React.useEffect(() => {
		const tick = () => savedCallback.current();
		if (typeof delay === "number") {
			intervalRef.current = window.setInterval(tick, delay);
			return () => window.clearInterval(intervalRef.current);
		}
	}, [delay]);
	return intervalRef;
}

export default useInterval;
