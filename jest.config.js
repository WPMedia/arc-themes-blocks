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
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  collectCoverageFrom: [
    '**/(features|chains|layouts|sources|output-types)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/images/*.svg',
  ],
};
