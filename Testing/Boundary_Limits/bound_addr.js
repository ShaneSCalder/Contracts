const { ethers } = require("hardhat");
const assert = require("assert");

async function testAddressBoundary() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();

  // Test zero address
  const zeroAddress = ethers.constants.AddressZero;
  const isZero = await myContract.isZeroAddress(zeroAddress);
  assert.strictEqual(isZero, true, "Zero address check failed");

  // Test valid address
  const validAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
  const isValid = await myContract.isValidAddress(validAddress);
  assert.strictEqual(isValid, true, "Valid address check failed");

  // Test invalid address format
  const invalidFormat = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC";
  try {
    await myContract.isValidAddress(invalidFormat);
    assert.fail("Invalid address format check failed");
  } catch (error) {
    assert.strictEqual(
      error.message,
      "revert",
      "Invalid address format check failed with incorrect error message"
    );
  }

  console.log("Address boundary limit tests passed!");
}

testAddressBoundary().catch((error) => {
  console.error(error);
  process.exit(1);
});
console.log("All tests passed!");
