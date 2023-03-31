import React from "react";
import { mount, shallow } from "enzyme";
import ContactInfo from ".";

describe("ContactInfo", () => {
	it("renders form and associated inputs", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
			<ContactInfo callback={mockCallBack} user={false} logoutCallback={mockCallBack2} />
		);

		expect(wrapper.find(".xpmedia-subscriptions-contact-info").exists()).toBe(true);
		expect(wrapper.find("input").length).toEqual(3);
		expect(wrapper.find("button").length).toEqual(1);
	});
	it("Does not call form callback when form is not filled out", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
			<ContactInfo callback={mockCallBack} user={false} logoutCallback={mockCallBack2} />
		);
		const btn = wrapper.find("Button");
		btn.simulate("click");
		expect(mockCallBack.mock.calls.length).toEqual(0);
	});

	it("renders sign out button when user is signed in", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
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

		expect(wrapper.find(".sign-out-btn").exists()).toBe(true);
	});

	it("renders text and icon indicating user is signed in through Google", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
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

		expect(wrapper.find(".identity-row").exists()).toBe(true);
		expect(wrapper.find("[data-testid='google-icon']").length).toBe(1);
	});

	it("renders text and icon indicating user is signed in through Facebook", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
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
			/>
		);

		expect(wrapper.find(".identity-row").exists()).toBe(true);
		expect(wrapper.find("[data-testid='facebook-icon']").length).toBe(1);
	});

	it("renders text indicating user is signed in through password", () => {
		const mockCallBack = jest.fn();
		const mockCallBack2 = jest.fn();
		const wrapper = mount(
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
							type: "Password",
							lastLoginDate: 1639164736000,
							locked: false,
						},
					],
				}}
				signedInIdentity={{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Password",
					lastLoginDate: 1639164736000,
					locked: false,
				}}
				logoutCallback={mockCallBack2}
			/>
		);

		expect(wrapper.find(".identity-row").exists()).toBe(true);
	});
	it.only("calls the form callback when form is submiited", () => {
		const callbackMock = jest.fn();
		const preventDefaultMock = jest.fn();
		const checkValidityMock = jest.fn().mockReturnValue(true);
		jest
			.spyOn(React, "useRef")
			.mockReturnValueOnce({ current: { checkValidity: checkValidityMock } });
		jest.spyOn(React, "useRef").mockReturnValueOnce({ current: {} });

		const wrapper = shallow(
			<ContactInfo
				callback={callbackMock}
				user={{
					email: "arcuser@gmail.com",
					firstName: "Arc",
					lastName: "Xp",
				}}
				signedInIdentity={{
					userName: "106487204473538668210",
					passwordReset: false,
					type: "Google",
					lastLoginDate: 1639164736000,
					locked: false,
				}}
			/>
		);
		wrapper.props().onSubmit({ preventDefault: preventDefaultMock });
		// console.log(" wrapper ", wrapper.props().onSubmit())
		expect(callbackMock).toHaveBeenCalled();
		expect(preventDefaultMock).toHaveBeenCalled();
	});
});
