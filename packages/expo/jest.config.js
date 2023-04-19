/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  displayName: 'clerk-expo',
  injectGlobals: true,

  // testEnvironment: './jest-environment-jsdom.js',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: ['/.*/__tests__/.*.test.[jt]sx?$'],
  testPathIgnorePatterns: ['/node_modules/'],

  collectCoverage: false,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],

  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '^.+\\.m?tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json', diagnostics: false }],
  },
};

module.exports = config;
