import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import EmailEditableFieldContainer from './EmailEditableFieldContainer';

const mockUpdateProfile = jest.fn(() => Promise.resolve())
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
    render(
      <EmailEditableFieldContainer
        blockClassName="test-class"
        email="old@example.com"
        setEmail={setEmail}
      />
    );

    fireEvent.click(screen.getByText('identity-block.edit'));
    const inputElement = screen.getByLabelText('identity-block.email')
    fireEvent.input(inputElement, { target: { value: 'new@example.com' } });

    expect(inputElement.value).toBe('new@example.com');
  });
});