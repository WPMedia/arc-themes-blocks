import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Heading from './heading';
import HeadingSection from './section';

export default {
  title: 'Shared Styles/Heading',
  decorators: [withKnobs],
  component: Heading,
};

export const heading = () => (
  <Heading>Heading Level 1</Heading>
);

export const nestedHeadings = () => (
  <HeadingSection>
    <Heading>Heading Level 2</Heading>
    <HeadingSection>
      <Heading>Heading Level 3</Heading>
      <HeadingSection>
        <Heading>Heading Level 4</Heading>
        <HeadingSection>
          <Heading>Heading Level 5</Heading>
          <HeadingSection>
            <Heading>Heading Level 6</Heading>
          </HeadingSection>
        </HeadingSection>
      </HeadingSection>
    </HeadingSection>
  </HeadingSection>
);

export const nestSecondaryHeadings = () => (
  <HeadingSection>
    <Heading font="Secondary">Heading Level 2</Heading>
    <HeadingSection>
      <Heading font="Secondary">Heading Level 3</Heading>
      <HeadingSection>
        <Heading font="Secondary">Heading Level 4</Heading>
        <HeadingSection>
          <Heading font="Secondary">Heading Level 5</Heading>
          <HeadingSection>
            <Heading font="Secondary">Heading Level 6</Heading>
          </HeadingSection>
        </HeadingSection>
      </HeadingSection>
    </HeadingSection>
  </HeadingSection>
);
