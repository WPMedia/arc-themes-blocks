import React from 'react';

import Button, { BUTTON_STYLES, BUTTON_SIZES, BUTTON_TYPES } from '.';

export default {
  title: 'Blocks/Identity/Components/Button',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Filled = () => (
  <Button buttonStyle={BUTTON_STYLES.FILLED} text="Sign up" />
);

export const Outlined = () => (
  <Button buttonStyle={BUTTON_STYLES.OUTLINED} text="Sign up" />
);

export const WhiteBackgroundFilled = () => (
  <Button buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED} text="Sign up" />
);

export const OutlineSmall = () => (
  <Button buttonStyle={BUTTON_STYLES.OUTLINED} buttonSize={BUTTON_SIZES.SMALL} text="Sign up" />
);

// outlined medium button
export const OutlinedMedium = () => (
  <Button
    buttonStyle={BUTTON_STYLES.OUTLINED}
    buttonSize={BUTTON_SIZES.MEDIUM}
    text="Sign up"
  />
);

// outlined large button
export const OutlinedLarge = () => (
  <Button
    buttonStyle={BUTTON_STYLES.OUTLINED}
    buttonSize={BUTTON_SIZES.LARGE}
    text="Sign up"
  />
);

export const LongText = () => (
  <Button
    text="Sign up to get the very best experience and this other really long work and such and more and even more text.Sign up to get the very best experience and this other really long work and such and more and even more text."
  />
);

export const UserIconWithLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.OUTLINED}
    buttonSize={BUTTON_SIZES.LARGE}
    text="Sign up"
    iconType="user"
  />
);

export const IconOnly = () => (
  <Button
    buttonType={BUTTON_TYPES.ICON_ONLY}
    text="Sign up"
    iconType="user"
    buttonStyle={BUTTON_STYLES.OUTLINED}
  />
);

export const IconWithLabel = () => (
  <Button
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    text="Sign up"
    iconType="user"
    buttonStyle={BUTTON_STYLES.OUTLINED}
  />
);

export const LabelOnly = () => (
  <Button
    buttonType={BUTTON_TYPES.LABEL_ONLY}
    text="Sign up"
    buttonStyle={BUTTON_STYLES.OUTLINED}
  />
);
