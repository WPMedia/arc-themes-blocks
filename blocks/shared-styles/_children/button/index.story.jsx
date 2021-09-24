import React from 'react';

import Button, { BUTTON_STYLES, BUTTON_SIZES, BUTTON_TYPES } from '.';

export default {
  title: 'Shared Styles/Button',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

// start primary
export const PrimaryLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonTypes={BUTTON_TYPES.LABEL_ONLY}
    text="Sign up"
  />
);

export const PrimaryIconAndLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    iconType="user"
    text="Sign up"
  />
);

export const PrimaryIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonType={BUTTON_TYPES.ICON_ONLY}
    iconType="user"
    ariaLabel="Sign up"
  />
);

export const PrimaryDualIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
    iconType="user"
    text="Sign up"
    secondaryIconType="chevron-up"
  />
);
// end primary

// start primary reverse
export const PrimaryReverseLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_ONLY}
    text="Sign up"
  />
);

export const PrimaryReverseIconAndLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    iconType="user"
    text="Sign up"
  />
);

export const PrimaryReverseIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY_REVERSE}
    buttonType={BUTTON_TYPES.ICON_ONLY}
    iconType="user"
    ariaLabel="Sign up"
  />
);

export const PrimaryReverseDualIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
    iconType="user"
    text="Sign up"
    secondaryIconType="chevron-up"
  />
);
// end primary reverse

// start secondary
export const SecondaryLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY}
    buttonType={BUTTON_TYPES.LABEL_ONLY}
    text="Sign up"
  />
);

export const SecondaryIconAndLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY}
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    iconType="user"
    text="Sign up"
  />
);

export const SecondaryIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY}
    buttonType={BUTTON_TYPES.ICON_ONLY}
    iconType="user"
    ariaLabel="Sign up"
  />
);

export const SecondaryDualIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY}
    buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
    iconType="user"
    text="Sign up"
    secondaryIconType="chevron-up"
  />
);
// end secondary

// start secondary reverse
export const SecondaryReverseLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_ONLY}
    text="Sign up"
  />
);

export const SecondaryReverseIconAndLabel = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_AND_ICON}
    iconType="user"
    text="Sign up"
  />
);

export const SecondaryReverseIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY_REVERSE}
    buttonType={BUTTON_TYPES.ICON_ONLY}
    iconType="user"
    ariaLabel="Sign up"
  />
);

export const SecondaryReverseDualIcon = () => (
  <Button
    buttonStyle={BUTTON_STYLES.SECONDARY_REVERSE}
    buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
    iconType="user"
    text="Sign up"
    secondaryIconType="chevron-up"
  />
);
// end secondary reverse

export const PrimarySmall = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonSize={BUTTON_SIZES.SMALL}
    text="Sign up"
  />
);

export const PrimaryLarge = () => (
  <Button
    buttonStyle={BUTTON_STYLES.PRIMARY}
    buttonSize={BUTTON_SIZES.LARGE}
    text="Sign up"
    secondaryIconType="chevron-up"
  />
);
// end secondary reverse

export const CustomAriaLabel = () => (
  <Button
    text="Login"
    ariaLabel="Opens login window"
  />
);

export const CustomSubmitType = () => (
  <Button
    text="Type Submit"
    type="submit"
  />
);

export const ButtonResetType = () => (
  <Button
    text="Type Reset"
    type="reset"
  />
);

export const aLinkButton = () => (
  <Button
    text="Type Reset"
    as="a"
    href="https://arcxp.com"
  />
);
