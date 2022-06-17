import React, { useState } from "react";

import useCustomEvent from "../../utils/use-custom-event";

function CrossFeatureComm() {
	const [myState, setMyState] = useState({ color: "red" });

	const eventDispatcher = useCustomEvent();

	useCustomEvent("userPickedColor", ({ detail }) => {
		if (detail.color) {
			setMyState({ color: detail.color });
		}
	});

	useCustomEvent("userPickedSize", ({ detail }) => {
		if (detail.size) {
			setMyState({ size: detail.size });
		}
	});

	return (
		<div
			style={{
				border: "1px solid grey",
				margin: "0.5em",
			}}
		>
			<div>{JSON.stringify(myState)}</div>
			<button
				onClick={() => {
					eventDispatcher("aCrazyBroadcast", { message: "A Crazy Message" });
				}}
				style={{
					cursor: "pointer",
					padding: "0.25em",
					margin: "0.25em",
					border: "1px solid black",
				}}
				type="button"
			>
				Broadcast A Crazy Message
			</button>
		</div>
	);
}

CrossFeatureComm.label = "Cross Feature Comm – Arc Block";

export default CrossFeatureComm;
