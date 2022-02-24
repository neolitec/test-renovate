module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
}
