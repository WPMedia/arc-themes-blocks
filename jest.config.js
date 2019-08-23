module.exports = {
  projects: [
    '<rootDir>/blocks/*/jest.config.js',
    // '<rootDir>/components/*/jest.config.js',
    // Uncomment the components tests once we actually have them.
    // Jest doesn't have an option to ignore those errors.
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '**/*.svg',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
