module.exports = {
  testEnvironment: "node",

  testRegex: ["utils/.*/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"],

  verbose: true,
  silent: true,

  // runInBand: true,
  bail: 1,
  testTimeout: 60000,
  forceExit: true,
  // clearMocks: true,
  // resetMocks: true,
  // restoreMocks: true,
};
