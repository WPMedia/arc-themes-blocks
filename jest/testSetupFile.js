/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

configure({ adapter: new Adapter() });

jest.mock("@wpmedia/placeholder-image-block", () => ({
  __esModule: true,
  default: function PlaceholderImage() {
    return <img alt="placeholder" />;
  },
}));

beforeEach(() => {
  jest.resetModules();
});
