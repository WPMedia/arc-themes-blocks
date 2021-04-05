import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BylineContainer from './BylineContainer';

test('Shows null with no content and no customFields', () => {
  const { container } = render(<BylineContainer />);

  expect(container.firstChild).toBeNull();
});

test('Shows one author name with additional properties', () => {
  const content = {
    credits: {
      by: [
        {
          _id: 'saracarothers',
          additional_properties: {
            original: {
              byline: 'Sara Lynn Carothers',
            },
          },
          name: 'Sara Carothers',
          type: 'author',
          url: '/author/sara-carothers/',
        },
      ],
    },
  };

  render(<BylineContainer
    content={content}
    customFields={{
      showByline: true,
    }}
  />);

  const separator = screen.queryByTestId('separator');

  expect(separator).toHaveTextContent('●');

  // additional properties will override name on byline
  const target = screen.getByText('Sara Lynn Carothers');

  expect(target.outerHTML).toBe('<a href="/author/sara-carothers/">Sara Lynn Carothers</a>');
});

test('Shows two authors with name without additional properties', () => {
  const content = {
    credits: {
      by: [
        {
          _id: 'saracarothers',
          name: 'Sara Carothers',
          type: 'author',
          url: '/author/sara-carothers/',
        },
        {
          _id: 'bobsquids',
          name: 'Bob Squidward',
          type: 'author',
          url: '/author/bob-squidward/',
        },
      ],
    },
  };

  render(<BylineContainer
    content={content}
    customFields={{
      showByline: true,
    }}
  />);

  const links = screen.getAllByRole('link');

  expect(links[0].textContent).toBe('Sara Carothers');
  expect(links[1].textContent).toBe('Bob Squidward');

  const separator = screen.queryByTestId('separator');

  expect(separator).toHaveTextContent('●');
});

test('Does not show separator if byline is not valid', () => {
  const content = {
    credits: {
      by: [
        {
          name: '',
          type: 'author',
          additional_properties: {
            original: {
              byline: '',
            },
          },
        },
      ],
    },
  };

  render(<BylineContainer
    content={content}
    customFields={{
      showByline: true,
    }}
  />);

  const separator = screen.queryByTestId('separator');

  expect(separator).toBeNull();
});

test('Does not show separator with multiple empty byline objects', () => {
  const multipleBylineObjects = [
    {
      id: '1',
    },
    {
      id: '2',
    },
  ];
  const content = {
    credits: {
      by: multipleBylineObjects,
    },
  };
  render(
    <BylineContainer
      content={content}
      customFields={{
        showByline: true,
      }}
    />,
  );

  const separator = screen.queryByTestId('separator');

  expect(separator).toBeNull();
});
