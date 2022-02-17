import React from 'react';

import { ResetPasswordPresentation } from './default';

export default {
  title: 'Blocks/Identity/Blocks/Reset Password',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const phrases = {
  t: (phrase) => ({
    'identity-block.confirm-password': 'Confirm Password',
    'identity-block.confirm-password-error': 'Passwords must match',
    'identity-block.password': 'Password',
    'identity-block.password-requirements': 'Passwords must meet our strict requirements.',
    'identity-block.password-requirements-characters': 'Characters',
    'identity-block.password-requirements-lowercase': 'Lowercase',
    'identity-block.password-requirements-numbers': 'Numbers',
    'identity-block.password-requirements-uppercase': 'Uppercase',
    'identity-block.reset-password-error': 'There was an error with your password',
    'identity-block.reset-password-headline': 'Create your new password',
    'identity-block.reset-password-headline-submitted': 'New password saved',
    'identity-block.reset-password-instruction': 'Enter a new password for your account.',
    'identity-block.reset-password-instruction-submitted': 'Your new password has been saved.',
    'identity-block.reset-password-submit': 'Continue',
    'identity-block.reset-password-submit-submitted': 'Continue to Login',
  }[phrase]),
};

export const basic = () => <ResetPasswordPresentation isAdmin phrases={phrases} successActionUrl="./" />;
