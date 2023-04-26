import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import useIdentity from "../../components/Identity";
import AccountManagement, { AccountManagementPresentational } from "./default";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		locale: "en",
	}))
);

jest.mock("../../components/Identity");

jest.mock("./_children/PasswordEditableFieldContainer", () => () => {
	const MockName = "password-editable-field-container-mock";
	return <MockName />;
});

jest.mock("fusion:intl", () => ({
	__esModule: true,
	default: jest.fn((locale) => ({
		t: jest.fn((phrase) => require("../../intl.json")[phrase][locale]),
	})),
}));

const userProfileMock = jest.fn(() =>
	Promise.resolve({ email: "test@domain.com", identities: [] })
);

describe("Account management", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	it("renders header text", () => {
		const wrapper = mount(<AccountManagementPresentational header="header" />);
		expect(wrapper.find("h2").text()).toEqual("header");
	});

	it("should render account management if logged in and initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<AccountManagement customFields={{}} />);
		});
		await userProfileMock;
		wrapper.update();

		expect(wrapper.find("h2").text()).toEqual("Account Information");
	});

	it("should not render if not logged in and not initialized", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: false,
			isLoggedIn: () => false,
			Identity: {
				isLoggedIn: jest.fn(async () => false),
				getConfig: jest.fn(async () => ({})),
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<AccountManagement customFields={{}} />);
		});
		wrapper.update();
		expect(wrapper.html()).toBe(null);
	});

	it("shows email input editable field if showing email", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<AccountManagement customFields={{ showEmail: true }} />);
		});
		await userProfileMock;
		wrapper.update();
		expect(wrapper.find("EmailEditableFieldContainer").length).toBe(1);
	});

	it("hides email input editable field if showing email", () => {
		const wrapper = shallow(<AccountManagement customFields={{ showEmail: false }} />);
		expect(wrapper.find("EmailEditableFieldContainer").length).toBe(0);
	});

	it("shows password input editable field if showing password", async () => {
		useIdentity.mockImplementation(() => ({
			isInitialized: true,
			isLoggedIn: () => true,
			Identity: {
				isLoggedIn: jest.fn(async () => true),
				getConfig: jest.fn(async () => ({})),
				getUserProfile: userProfileMock,
			},
		}));

		let wrapper;
		await act(async () => {
			wrapper = await mount(<AccountManagement customFields={{ showPassword: true }} />);
		});
		await userProfileMock;
		wrapper.update();
		expect(wrapper.find("password-editable-field-container-mock").length).toBe(1);
	});

	it("hides password input editable field if showing password", () => {
		const wrapper = shallow(<AccountManagement customFields={{ showPassword: false }} />);
		expect(wrapper.find("PasswordEditableFieldContainer").length).toBe(0);
	});
});
