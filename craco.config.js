module.exports = {
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [
            "./node_modules/@uswds",
            "./node_modules/@uswds/uswds/packages",
          ],
        },
      },
    },
  },
  webpack: {
    alias: {
      path: require.resolve("path-browserify"),
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.transformIgnorePatterns = ["node_modules/(?!(axios)/)"];
      jestConfig.collectCoverageFrom = [
        "src/**/*.{js,jsx,ts,tsx}",
        "!node_modules/",
        "!src/config.js",
        "!src/serviceWorker.js",
        "!src/index.js",
        "!src/App.js",
        "!src/store/configureStore.dev.js",
        "!src/store/actions/actionTypes.js",
        "!src/store/reducers/index.js",
        "!src/store/reducers/initialState.js",
        "!src/utils/api/axiosSetup.js",
        "!src/utils/api/setupTests.js",
      ];
      jestConfig.coverageReporters = ["html", "text", "clover", "json", "lcov"];
      jestConfig.collectCoverage = true;
      jestConfig.moduleNameMapper = {
        "\\.svg$": "<rootDir>/jest/file-transformer.js",
      };
      return jestConfig;
    },
  },
};
