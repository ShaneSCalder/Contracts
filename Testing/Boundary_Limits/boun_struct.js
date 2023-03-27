const { ethers } = require("hardhat");

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const contract = await MyContract.deploy();

  // Check the struct length
  const structLength = 5;
  const myStruct = Array.from({ length: structLength }, (_, i) => i);
  const tooLongStruct = Array.from({ length: structLength + 1 }, (_, i) => i);

  try {
    await contract.checkStructLength(myStruct);
  } catch (error) {
    console.error("Unexpected error:", error);
  }

  try {
    await contract.checkStructLength(tooLongStruct);
    console.error("Struct length check failed: input too long");
  } catch (error) {
    console.log("Struct length check passed:", error.message);
  }

  // Check struct fields
  const validStruct = { field1: 10, field2: "foo", field3: true };
  const invalidStruct1 = { field1: -10, field2: "foo", field3: true };
  const invalidStruct2 = { field1: 10, field2: "", field3: true };
  const invalidStruct3 = { field1: 10, field2: "foo", field3: 100 };

  try {
    await contract.checkStructFields(validStruct);
  } catch (error) {
    console.error("Unexpected error:", error);
  }

  try {
    await contract.checkStructFields(invalidStruct1);
    console.error("Struct field check failed: invalid field1 value");
  } catch (error) {
    console.log("Struct field check passed:", error.message);
  }

  try {
    await contract.checkStructFields(invalidStruct2);
    console.error("Struct field check failed: invalid field2 value");
  } catch (error) {
    console.log("Struct field check passed:", error.message);
  }

  try {
    await contract.checkStructFields(invalidStruct3);
    console.error("Struct field check failed: invalid field3 value");
  } catch (error) {
    console.log("Struct field check passed:", error.message);
  }
}

main();
