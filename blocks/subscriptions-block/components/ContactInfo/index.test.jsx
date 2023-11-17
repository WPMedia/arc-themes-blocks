import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

import ContactInfo from ".";

const BLOCK_CLASS_NAME = "b-checkout";

describe("ContactInfo", () => {
	it("renders form and associated inputs", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		render(
			<ContactInfo
				className={BLOCK_CLASS_NAME}
				callback={mockCallBack}
				user={false}
				logoutCallback={mockCallBack2}
			/>
		);

		expect(screen.getByRole("input").length).toEqual(4);
		expect(screen.getByRole("button").length).toEqual(1);
	});

	it("Does not call form callback when form is not filled out", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		render(
			<ContactInfo
				className={BLOCK_CLASS_NAME}
				callback={mockCallBack}
				user={false}
				logoutCallback={mockCallBack2}
			/>
		);
		fireEvent.click(screen.getByRole("button"));
		expect(mockCallBack.mock.calls.length).toEqual(0);
	});

	it("renders sign out button when user is signed in", async () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();

		await act(async () => {
			render(
				<ContactInfo
					callback={mockCallBack}
					user={{
						email: "arcuser@gmail.com",
						firstName: "Arc",
						lastName: "Xp",
						identities: [
							{
								userName: "106487204473538668210",
								passwordReset: false,
								type: "Google",
								lastLoginDate: 1639164736000,
								locked: false,
							},
						],
					}}
					signedInIdentity={{
						userName: "106487204473538668210",
						passwordReset: false,
						type: "Google",
						lastLoginDate: 1639164736000,
						locked: false,
					}}
					logoutCallback={mockCallBack2}
				/>
			);
		});
		const logOutbutton = screen.getByText("checkout-block.identity-sign-out");
		expect(logOutbutton).not.toBeNull();
	});

	it("renders text and icon indicating user is signed in through Google", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		render(
			<ContactInfo
				callback={mockCallBack}
				user={{
					email: "arcuser@gmail.com",
					firstName: "Arc",
					lastName: "Xp",
					identities: [
						{
							userName: "106487204473538668210",
							passwordReset: false,
							type: "Google",
							lastLoginDate: 1639164736000,
							locked: false,
						},
					],
				}}
				signedInIdentity={{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Google",
					lastLoginDate: 1639164736000,
					locked: false,
				}}
				logoutCallback={mockCallBack2}
				className={BLOCK_CLASS_NAME}
			/>
		);

		expect(screen.getByRole("svg")).not.toBeNull();
	});

	it("renders text and icon indicating user is signed in through Facebook", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		render(
			<ContactInfo
				callback={mockCallBack}
				user={{
					email: "arcuser@gmail.com",
					firstName: "Arc",
					lastName: "Xp",
					identities: [
						{
							userName: "106487204473538668210",
							passwordReset: false,
							type: "Facebook",
							lastLoginDate: 1639164736000,
							locked: false,
						},
					],
				}}
				signedInIdentity={{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Facebook",
					lastLoginDate: 1639164736000,
					locked: false,
				}}
				logoutCallback={mockCallBack2}
				className={BLOCK_CLASS_NAME}
			/>
		);

		expect(screen.getByRole("svg")).not.toBeNull();
	});

	it("renders text indicating user is signed in through password", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();

		const user = {
			email: "arcuser@gmail.com",
			firstName: "Arc",
			lastName: "Xp",
			identities: [
				{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Password",
					lastLoginDate: 1639164736000,
					locked: false,
				}
			]
		};

		render(
			<ContactInfo
				callback={mockCallBack}
				user={user}
				signedInIdentity={{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Password",
					lastLoginDate: 1639164736000,
					locked: false,
				}}
				logoutCallback={mockCallBack2}
				className={BLOCK_CLASS_NAME}
			/>
		);

		expect(screen.getByText(`Signed in as ${user.email}`)).not.toBeNull();
	});
});