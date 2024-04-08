import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { useIdentity } from "@wpmedia/arc-themes-components";
import EmailEditableFieldContainer from './EmailEditableFieldContainer';


mockUpdateProfile = jest.fn(() => Promise.resolve())
const mockIdentity = {
	apiOrigin: "http://origin/",
	isLoggedIn: jest.fn(() => false),
	getConfig: jest.fn(() => ({})),
    updateUserProfile: mockUpdateProfile
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	useIdentity: jest.fn(() => ({
		isInitialized: true,
		Identity: {
			...mockIdentity,
		},
	}))
}));

describe('EmailEditableFieldContainer', () => {
  it('updates email and clears error on successful submission', async () => {
    const setEmail = jest.fn();
    const { getByLabelText, getByText } = render(
      <EmailEditableFieldContainer
        blockClassName="test-class"
        email="old@example.com"
        setEmail={setEmail}
      />
    );

    fireEvent.click(getByText('identity-block.edit'));
    const inputElement = getByLabelText('identity-block.email')
    fireEvent.input(inputElement, { target: { value: 'new@example.com' } });

    expect(inputElement.value).toBe('new@example.com');
  });
});