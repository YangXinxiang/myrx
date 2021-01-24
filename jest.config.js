
module.exports = {
    "roots": [
      "<rootDir>/test"
    ],
    /*
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },*/
    //"testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    // testMatch: ["<rootDir>/test/**/*.(spec|test).ts?(x)"],
    testMatch: ["<rootDir>/test/**/*.(spec|test).js?(x)"],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
  }
  
  