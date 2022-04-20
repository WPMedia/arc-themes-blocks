import React from "react";
import { mount } from "enzyme";

import FormPasswordConfirm from ".";

describe("Form Password Confirm", () => {
	it("renders with required items", () => {
		const wrapper = mount(
			<FormPasswordConfirm confirmLabel="Confirm" label="Password" name="field1" />
		);

		expect(wrapper.find('input[name="field1"]').at(0)).not.toBeNull();
		expect(wrapper.find("label").at(0).text().includes("Password")).toBe(true);
		expect(wrapper.find("label").at(1).text().includes("Confirm")).toBe(true);
	});

	it("renders with an error if the password is empty", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				label="Password"
				name="field1"
				validationErrorMessage="Please enter something"
			/>
		);

		wrapper.find('input[name="field1"]').at(0).simulate("blur");

		expect(wrapper.text().includes("Please enter something")).toBe(true);
	});

	it("renders with an error if the password confirm is not matching", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
			/>
		);

		wrapper.find("input").at(0).instance().value = "thisIsNotMyPassword";
		wrapper
			.find("input")
			.at(0)
			.simulate("change", { target: { value: "thisIsMyPassword" } });
		wrapper
			.find("input")
			.at(1)
			.simulate("change", { target: { value: "thisIsMyPassword!" } });
		wrapper.find("input").at(1).simulate("blur");

		expect(wrapper.text().includes("Must match password")).toBe(true);
	});

	it("renders with placeholders", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmPlaceholder="Confirm Password"
				label="Password"
				name="field1"
				placeholder="Enter Password"
			/>
		);

		expect(wrapper.find('input[placeholder="Enter Password"]').length).toBe(1);
		expect(wrapper.find('input[placeholder="Confirm Password"]').length).toBe(1);
	});

	it("renders with tips", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmTip="Confirm Tip"
				label="Password"
				tip="Password Tip"
				name="field1"
			/>
		);

		expect(wrapper.find("div.xpmedia-form-field-tip").at(0).text().includes("Password Tip")).toBe(
			true
		);
		expect(wrapper.find("div.xpmedia-form-field-tip").at(1).text().includes("Confirm Tip")).toBe(
			true
		);
	});

	it("renders errors if showDefaultError", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
				showDefaultError
				validationErrorMessage="Please enter something"
			/>
		);

		expect(
			wrapper.find("div.xpmedia-form-field-tip").at(0).text().includes("Please enter something")
		).toBe(true);
		expect(
			wrapper.find("div.xpmedia-form-field-tip").at(1).text().includes("Must match password")
		).toBe(true);
	});

	it("renders errors if validation pattern is not met", () => {
		const wrapper = mount(
			<FormPasswordConfirm
				confirmLabel="Confirm"
				confirmValidationErrorMessage="Must match password"
				label="Password"
				name="field1"
				showDefaultError
				validationPattern="^valid$"
				validationErrorMessage="Please enter something good"
			/>
		);

		wrapper.find("input").at(0).instance().value = "thisIsMyPassword";
		wrapper.find("input").at(0).simulate("blur");
		expect(
			wrapper
				.find("div.xpmedia-form-field-tip")
				.at(0)
				.text()
				.includes("Please enter something good")
		).toBe(true);
	});
});
