module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  testEnvironment: 'node', // or 'jsdom' for browser environments
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  collectCoverageFrom: [
    'src/**/*.ts',
    'test/**/*.ts',
    '!src/**/*.d.ts', // Exclude declaration files
    '!test/**/*.d.ts'
  ],
  moduleDirectories: ["node_modules", "src", "test"],
};