export default {
    testEnvironment: 'jest-fixed-jsdom',
    testEnvironmentOptions: {
        customExportConditions: [''],
      },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/src/mocks/styleMock.js',
        '\\.svg$': '<rootDir>/jest/file-transformer.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(axios|other-module)/)",
    ],
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!node_modules/',
        '!src/config.js',
        '!src/serviceWorker.js',
        '!src/index.js',
        '!src/App.js',
        '!src/store/configureStore.dev.js',
        '!src/store/actions/actionTypes.js',
        '!src/store/reducers/index.js',
        '!src/store/reducers/initialState.js',
        '!src/utils/api/axiosSetup.js',
        '!src/utils/api/setupTests.js',
    ],
    coverageReporters: ['html', 'text', 'clover', 'json', 'lcov'],
};