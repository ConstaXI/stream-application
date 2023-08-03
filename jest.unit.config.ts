import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['text', 'lcov', 'clover'],
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.spec.ts'],
  clearMocks: true,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.unit.setup.ts'],
};

export default config;
