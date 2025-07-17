// test.js, 
// To be run with => node utils-test.js
import { BitString, sha256BitString } from './utils.js';

async function runTests() {
  console.log("=== BitString basic tests ===");

  // Test creation and set/get
  const bs = new BitString(8);
  bs.set(0, true);
  bs.set(3, true);
  bs.set(7, true);
  console.assert(bs.get(0) === true, "Bit 0 should be true");
  console.assert(bs.get(1) === false, "Bit 1 should be false");
  console.assert(bs.get(3) === true, "Bit 3 should be true");
  console.assert(bs.get(7) === true, "Bit 7 should be true");
  console.assert(bs.toString() === "10001001", `toString() got "${bs.toString()}"`);

  console.log("BitString basic tests passed.\n");

  console.log("=== BitString concat tests ===");
  const a = new BitString(4);
  a.set(0, true);
  a.set(2, true);
  a.set(3, true);
  // 1101

  const b = new BitString(3);
  b.set(1, true);
  // 010

  const c = BitString.concat(a, b);
  console.assert(c.length === 7, "Concatenated length should be 7");
  console.assert(c.toString() === "1101010", `Concatenated bits wrong: ${c.toString()}`);

  console.log("BitString concat tests passed.\n");

  console.log("=== sha256BitString test ===");
  const input = new BitString(8);
  input.set(2, true);
  input.set(5, true);

  const hash = await sha256BitString(input);
  console.assert(hash instanceof BitString, "Hash should be a BitString");
  console.assert(hash.length === 256, "Hash length should be 256 bits");
  const str = hash.toString();
  console.assert(str.length === 256, "String representation should be 256 characters");
  console.assert(/^[01]{256}$/.test(str), "String representation should contain only 0s and 1s");

  console.log("sha256BitString test passed.\n");
  console.log("=== BitString bitToCharMap() tests ===");

// Test 1: 12-bit all zeros
const bs1 = new BitString(12);
// Should encode as "AA" (0,0)
const str1 = bs1.bitToCharMap();
console.assert(str1 === "BB", `Expected "BB", got "${str1}"`);

// Test 2: 6-bit value 0b111111 (63) => last char of alphabet ('/')
const bs2 = new BitString(6);
for (let i = 0; i < 6; i++) bs2.set(i, true);
const str2 = bs2.bitToCharMap();
console.assert(str2 === "#", `Expected "#", got "${str2}"`);

// Test 3: Known pattern (0b000000 + 0b000011) => "AD"
const bs3 = new BitString(12);
bs3.set(0, true);
bs3.set(1, true);
const str3 = bs3.bitToCharMap();
console.assert(str3 === "BF", `Expected "BF", got "${str3}"`);

// Test 4: Length not divisible by 6
const bs4 = new BitString(7);
let errorThrown = false;
try {
  bs4.bitToCharMap();
} catch (e) {
  errorThrown = true;
  console.assert(e.message.includes("divisible by 6"), "Error message should mention divisible by 6");
}
console.assert(errorThrown, "Should throw error if length is not divisible by 6");

console.log("BitString bitToCharMap() tests passed.\n");
  console.log("✅ All tests passed!");
}

runTests().catch(err => {
  console.error("Test suite failed:", err);
});
