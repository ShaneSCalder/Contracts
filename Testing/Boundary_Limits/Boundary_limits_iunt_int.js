const { ethers } = require("hardhat");
const assert = require("assert");

async function testBoundaryInputs() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();

  // Test all uint inputs for the input range 0 to 255
  for (let i = 0; i <= 255; i++) {
    const result = await myContract.myFunctionUint(i);
    const expected = i * 10;
    assert.strictEqual(result.toNumber(), expected, `uint input ${i} failed`);
  }

  // Test all int inputs for the input range -128 to 127
  for (let i = -128; i <= 127; i++) {
    const result = await myContract.myFunctionInt(i);
    const expected = i * 10;
    assert.strictEqual(result.toNumber(), expected, `int input ${i} failed`);
  }

  console.log("Boundary limit input tests passed!");
}

testBoundaryInputs().catch((error) => {
  console.error(error);
  process.exit(1);
});
console.log("All tests passed!");
