const { ethers } = require("hardhat");
const assert = require("assert");

async function testBoundaryInputs() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();

  // Test bool boundary limits
  const boolTests = [
    { input: true, expected: true },
    { input: false, expected: false }
  ];

  for (let i = 0; i < boolTests.length; i++) {
    const test = boolTests[i];
    const result = await myContract.myFunction(test.input);
    assert.strictEqual(result, test.expected, `Test failed for bool input '${test.input}': expected '${test.expected}', but got '${result}'`);
  }

  // Test other bool inputs
  const otherTests = [
    { input: true, expected: true },
    { input: false, expected: false },
    { input: 1, expected: true },
    { input: 0, expected: false },
    { input: "true", expected: true },
    { input: "false", expected: false },
    { input: "True", expected: true },
    { input: "False", expected: false },
    { input: "TRUE", expected: true },
    { input: "FALSE", expected: false },
    { input: "1", expected: true },
    { input: "0", expected: false },
    { input: "yes", expected: true },
    { input: "no", expected: false },
    { input: "on", expected: true },
    { input: "off", expected: false },
  ];

  for (let i = 0; i < otherTests.length; i++) {
    const test = otherTests[i];
    const result = await myContract.myFunction(test.input);
    assert.strictEqual(result, test.expected, `Test failed for bool input '${test.input}': expected '${test.expected}', but got '${result}'`);
  }

  console.log("Boundary limit input tests passed for bools!");
}

testBoundaryInputs().catch((error) => {
  console.error(error);
  process.exit(1);
});
console.log("All tests passed for bools!");
