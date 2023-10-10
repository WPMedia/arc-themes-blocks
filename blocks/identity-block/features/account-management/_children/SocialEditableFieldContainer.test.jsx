import React from "react";
import { render, screen } from "@testing-library/react";
import SocialEditableFieldContainer from "./SocialEditableFieldContainer";

describe("SocialEditableFieldContainer", () => {
	it("should render with disconnect option when connected", () => {
		render(
			<SocialEditableFieldContainer
				text="Connected user"
				onDisconnectFunction={() => {}}
				showDisconnectButton
				disconnectText="disconnect test"
			/>
		);
		expect(screen.getByText("disconnect test")).not.toBeNull();

		// added space is for formatting with the disconenct button
		expect(screen.getByText(/Connected user/i)).not.toBeNull();
	});
	it("should render without disconnect when disconnected", () => {
		render(
			<SocialEditableFieldContainer
				text="Disconnected user"
				onDisconnectFunction={() => {}}
				showDisconnectButton={false}
				disconnectText="disconnect test"
			/>
		);

		expect(screen.queryByRole("button")).toBeNull();
		// no added space is for formatting without the disconenct button
		expect(screen.getByText("Disconnected user")).not.toBeNull();
	});
});
