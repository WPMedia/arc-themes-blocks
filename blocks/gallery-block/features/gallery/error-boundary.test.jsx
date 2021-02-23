import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from './error-boundary';

describe('Error Boundary', () => {
  it('renders children', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>,
    );
    expect(wrapper.html()).toMatchInlineSnapshot('"<div>Children</div>"');
  });

  it('renders fallback', () => {
    const ErrorComponent = () => null;
    const wrapper = shallow(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    const error = new Error('hi!');
    wrapper.find(ErrorComponent).simulateError(error);
    expect(wrapper.html()).toMatchInlineSnapshot('"<div>Fallback</div>"');
  });
});
