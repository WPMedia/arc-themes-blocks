/* eslint-disable react/jsx-filename-extension */
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

beforeEach(() => {
	jest.resetModules();
});
