// Test script for array boundary limits

const { ethers } = require("hardhat");

async function main() {
  const myContract = await ethers.getContract("MyContract");

  // Test length of the array
  let arr1 = new Array(100000);
  await myContract.testArrayLength(arr1);

  // Test indexing
  let arr2 = [1, 2, 3];
  await myContract.testArrayIndexing(arr2, 3);

  // Test overflow and underflow
  let arr3 = new Array(100000);
  await myContract.testArrayOverflow(arr3);

  // Test empty arrays
  let arr4 = [];
  await myContract.testEmptyArray(arr4);

  // Test concatenation
  let arr5 = [1, 2, 3];
  let arr6 = [4, 5, 6];
  await myContract.testArrayConcatenation(arr5, arr6);

  // Test sorting
  let arr7 = [3, 1, 2];
  await myContract.testArraySorting(arr7);

  // Test slicing
  let arr8 = [1, 2, 3, 4, 5];
  await myContract.testArraySlicing(arr8);

  // Test nested arrays
  let arr9 = [[1, 2], [3, 4], [5, 6]];
  await myContract.testNestedArray(arr9);

  console.log("Array boundary limit tests completed.");
}

main();
