import { spacerCustomField, breakpointCustomField } from './custom-field';

jest.mock('prop-types', () => ({
  oneOf: jest.fn().mockReturnThis(),
  tag: (i) => i,
}));

jest.mock('@wpmedia/news-theme-css/js/framework', () => ({
  framework: {
    spacers: {
      xl: '0.75rem',
      sm: '0.5rem',
      xxl: '1rem',
    },
    gridBreakpoints: {
      xl: '1rem',
    },
  },
}));

describe('VSpace Custom Fields', () => {
  it('spacerCustomField', () => {
    const customFields = {
      ...spacerCustomField(
        'spacing',
        'Vertical Block Spacing',
        'spacing',
        'md',
        'description',
      ),
    };

    expect(customFields).toMatchInlineSnapshot(`
      Object {
        "spacing": Object {
          "defaultValue": "md",
          "description": "description",
          "group": "spacing",
          "labels": Object {
            "sm": "0.5rem - sm",
            "xl": "0.75rem - xl",
            "xxl": "1rem - xxl",
          },
          "name": "Vertical Block Spacing",
        },
      }
    `);
  });

  it('breakpointCustomField', () => {
    const customFields = {
      ...breakpointCustomField(
        'spacing',
        'Vertical Block Spacing',
        'spacing',
        'md',
        'description',
      ),
    };

    expect(customFields).toMatchInlineSnapshot(`
      Object {
        "spacing": Object {
          "defaultValue": "md",
          "description": "description",
          "group": "spacing",
          "labels": Object {
            "xl": "1rem - xl",
          },
          "name": "Vertical Block Spacing",
        },
      }
    `);
  });
});
