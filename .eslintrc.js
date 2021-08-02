module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Fusion: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
    'jsx-a11y',
    'react-hooks'
  ],
  rules: {
    'global-require': 'off',
    'no-underscore-dangle': ['error', { allow: ['_website', '_id'] }],
    'import/no-extraneous-dependencies': 'off', // This might be fine. It's worth looking into at the very least.
    'import/no-unresolved': [2, {
      ignore: ['react', '^fusion:.+$', '^@arc-test-org/.+$', '^@arc-publishing/.+$', '^@wpmedia/.+$', '~/blocks.json']
    }],
    'react/forbid-prop-types': 'off',
    'react/prop-types': 'off', // We will want to be more granular with this I assume.
    'react/require-default-props': 'off', // We will also want to have some rules around this. Whitelisting certain props for example
    'react/no-danger': 'off',
    'react/jsx-props-no-spreading': 'off',
    //For list of a11y definitions for this see: https://github.com/evcohen/eslint-plugin-jsx-a11y
    'jsx-a11y/accessible-emoji': 2,
    'jsx-a11y/alt-text': 2,
    'jsx-a11y/anchor-has-content': 2,
    'jsx-a11y/anchor-is-valid': 2,
    'jsx-a11y/aria-activedescendant-has-tabindex': 2,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/aria-proptypes': 2,
    'jsx-a11y/aria-role': 2,
    'jsx-a11y/aria-unsupported-elements': 2,
    'jsx-a11y/click-events-have-key-events': 2,
    'jsx-a11y/heading-has-content': 2,
    'jsx-a11y/html-has-lang': 2,
    'jsx-a11y/iframe-has-title': 2,
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/interactive-supports-focus': 2,
    'jsx-a11y/label-has-associated-control': [ 2, {
      'required': {
        'some': [ 'nesting', 'id' ]
      }
    }],
    'jsx-a11y/lang': 2,
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/no-access-key': 2,
    'jsx-a11y/no-autofocus': 2,
    'jsx-a11y/no-distracting-elements': 2,
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 2,
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 2,
    'jsx-a11y/no-onchange': 2,
    'jsx-a11y/no-redundant-roles': 2,
    'jsx-a11y/no-static-element-interactions': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/scope': 2,
    'jsx-a11y/tabindex-no-positive': 2,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  },
};
