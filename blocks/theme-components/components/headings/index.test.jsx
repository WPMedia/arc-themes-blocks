import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Heading from './heading';
import HeadingSection from './section';

describe('Heading', () => {
  it('should render as a h1', () => {
    render(<Heading />);
    const tree = renderer
      .create(<Heading />)
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
<h1
  className="c-heading "
/>
`);
  });
});

describe('HeadingSection', () => {
  it('should render as a h2', () => {
    const tree = renderer
      .create(<HeadingSection><Heading /></HeadingSection>)
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
<h2
  className="c-heading "
/>
`);
  });

  it('increases the heading level for each HeadingSection', () => {
    render(
      <div>
        <Heading>h1 text</Heading>
        <HeadingSection>
          <Heading>h2 text</Heading>
        </HeadingSection>
      </div>,
    );
    const tree = renderer
      .create(
        <div>
          <Heading>h1 text</Heading>
          <HeadingSection>
            <Heading>h2 text</Heading>
          </HeadingSection>
        </div>,
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
<div>
  <h1
    className="c-heading "
  >
    h1 text
  </h1>
  <h2
    className="c-heading "
  >
    h2 text
  </h2>
</div>
`);
  });
});
