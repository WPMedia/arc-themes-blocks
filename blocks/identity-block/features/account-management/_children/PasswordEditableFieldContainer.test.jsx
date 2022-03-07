import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import useIdentity from "../../../components/Identity";
import PasswordEditableFieldContainer from "./PasswordEditableFieldContainer";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("../../../components/Identity");

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../../intl.json")[phrase][locale]),
	})),
}));

const responseData = {
	pwLowercase: "1",
	pwMinLength: "1",
	pwPwNumbers: "1",
	pwSpecialCharacters: "1",
	pwUppercase: "1",
};

const getConfigMock = jest.fn(() => Promise.resolve(responseData));

describe("PasswordEditableFieldContainer", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("should render component with Add Password label", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<PasswordEditableFieldContainer />);
		});
		await getConfigMock;
		wrapper.update();
		expect(wrapper.find(".editable-form-input--value-text").text()).toBe("Add Password");
	});

	it("should render component with password placeholder label", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<PasswordEditableFieldContainer hasPassword />);
		});
		await getConfigMock;
		wrapper.update();
		expect(wrapper.find(".editable-form-input--value-text").text()).toBe("**********");
	});

	it("renders current password field and password confirm fields when hasPassword and editing", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<PasswordEditableFieldContainer hasPassword />);
		});
		await getConfigMock;
		wrapper.update();
		expect(wrapper.find(".editable-form-input--value-text").text()).toBe("**********");
		wrapper.find("button").simulate("click");
		expect(wrapper.find("input").length).toBe(3);
	});

	it("renders only password confirm fields when NOT hasPassword and editing", async () => {
		useIdentity.mockImplementation(() => ({
			Identity: {
				getConfig: getConfigMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<PasswordEditableFieldContainer />);
		});
		await getConfigMock;
		wrapper.update();
		expect(wrapper.find(".editable-form-input--value-text").text()).toBe("Add Password");
		wrapper.find("button").simulate("click");
		expect(wrapper.find("input").length).toBe(2);
	});
});
