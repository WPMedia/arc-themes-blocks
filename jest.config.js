module.exports = {
  transformIgnorePatterns: [
    '//node_modules/(?!@wpmedia/.*-block).*/',
    '//node_modules/(?!(@wpmedia)).*/',
  ],
  projects: [
    '<rootDir>/blocks/*/jest.config.js',
    // '<rootDir>/components/*/jest.config.js',
    // Uncomment the components tests once we actually have them.
    // Jest doesn't have an option to ignore those errors.
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
    // if an output type breaks, the page doesn't load
    // this should be higher, really
    'blocks/default-output-block/output-types': {
      statements: 86,
      branches: 80,
      functions: 100,
      lines: 85,
    },
  },
  collectCoverageFrom: [
    '**/(features|chains|layouts|sources|output-types|_children|components)/**/*.{js,jsx}',
    // for resizer image block
    '**/extractImageFromStory.js',
    '**/imageRatioCustomField.js',
    '**/ratioFor.js',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/images/*.svg',
    '!**/mock*.js',
    '!**/*.story*.jsx',
  ],
};
