// eslint-disable-next-line max-classes-per-file
import React from 'react';
import renderer from 'react-test-renderer';
import { HeadlineText, DescriptionText } from './styled-components';


describe('the HeadlineText', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<HeadlineText>Text</HeadlineText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('the DescriptionText', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<DescriptionText>Description</DescriptionText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
