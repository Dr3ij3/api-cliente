const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  preset: 'ts-jest',
  coverageProvider: 'v8',
  modulePathIgnorePatterns: ['dist'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: process.env.JEST_CLOVER_OUTPUT_DIR || './_devops/coverage',
  coverageReporters: ['text', 'clover', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/controller/*.{js,ts}',
    'src/**/repository/*.{js,ts}',
    'src/**/service/*.{js,ts}',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
};