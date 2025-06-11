module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "^@components/(.*)$": "<rootDir>/src/components/$1",
      "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
      "^@redux/(.*)$": "<rootDir>/src/redux/$1",
      "^@services/(.*)$": "<rootDir>/src/services/$1",
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "jest-transform-stub",
    },
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.test.{js,jsx,ts,tsx}",
      "!**/node_modules/**",
    ],
    coverageReporters: ["lcov", "text", "html", "json-summary"],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    modulePathIgnorePatterns: [
    ],
    // transformIgnorePatterns: ["/node_modules/(?!(@savedaily)/)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.[t|j]sx?$": "babel-jest",
    },
    coveragePathIgnorePatterns: [
      "<rootDir>/src/services/",
      "<rootDir>/src/redux/slices/",
      "<rootDir>/src/utils/",
      "<rootDir>/src/protectedRoutes/",
    ],
  };
  