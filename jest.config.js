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
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  collectCoverageFrom: [
    '**/(features|chains|layouts|output-types)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/images/*.svg',
  ],
};
