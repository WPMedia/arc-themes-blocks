module.exports = {
  projects: [
    '<rootDir>/blocks/*/jest.config.js',
    // '<rootDir>/components/*/jest.config.js',
    // Uncomment the components tests once we actually have them.
    // Jest doesn't have an option to ignore those errors.
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 88,
      branches: 88,
      functions: 87,
      lines: 88,
    },
    // if an output type breaks, the page doesn't load
    // this should be higher, really
    'default-output-block': {
      statements: 86,
      branches: 80,
      functions: 100,
      lines: 85,
    },
  },
  collectCoverageFrom: [
    '**/(features|chains|layouts|sources|output-types)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/images/*.svg',
    '!**/mock*.js',
  ],
};
