class BitString {
    static concat(left, right) {
        if (!(left instanceof BitString) || !(right instanceof BitString)) {
            throw new TypeError("Both arguments must be BitString instances.");
        }
        const newLength = left.length + right.length;
        const combinedBits = (left.bits << BigInt(right.length)) | right.bits;

        const result = new BitString(newLength);
        result.bits = combinedBits;
        return result;
    }

  constructor(length) {
    if (length <= 0) {
      throw new Error("Length must be positive");
    }
    this.length = length;
    this.bits = 0n;
  }
  // : Boolean -> ()
  set(index, bit) {
    this.#validateIndex(index);
    const mask = 1n << BigInt(index);
    if (bit) {
      this.bits |= mask; 
    } else {
      this.bits &= ~mask;
    }
  }
  // : () -> Boolean
  get(index) {
    this.#validateIndex(index);
    const mask = 1n << BigInt(index);
    return (this.bits & mask) !== 0n;
  }

  bitToCharMap() {
  const alphabet = "BCDFGHIJKLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/@*#&";

  if (this.length % 6 !== 0) {
    throw new Error(`BitString length (${this.length}) must be divisible by 6.`);
  }

  const result = [];
  const numChunks = this.length / 6;

  for (let i = numChunks - 1; i >= 0; i--) {
    // Extract 6 bits
    const shift = BigInt(i * 6);
    const chunk = Number((this.bits >> shift) & 0b111111n);
    result.push(alphabet[chunk]);
  }

  return result.join("");
}


  toString() {
    let str = "";
    for (let i = this.length - 1; i >= 0; i--) {
      str += this.get(i) ? "1" : "0";
    }
    return str;
  }

  #validateIndex(index) {
    if (typeof index !== "number" || index < 0 || index >= this.length) {
      throw new RangeError(`Index ${index} out of bounds.`);
    }
  }
}




// BitString -> BitString (Stolen from mozilla)
async function sha256BitString(bitstring) {
  // Convert BigInt to Uint8Array
  const byteLength = Math.ceil(bitstring.length / 8);
  const inputBytes = bigIntToUint8Array(bitstring.bits, byteLength);

  // Hash using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', inputBytes);
  const hashBytes = new Uint8Array(hashBuffer);

  // Convert hash bytes to BigInt
  let hashBigInt = 0n;
  for (const byte of hashBytes) {
    hashBigInt = (hashBigInt << 8n) | BigInt(byte);
  }

  // Create new BitString of length 256
  const result = new BitString(256);
  result.bits = hashBigInt;
  return result;
}

function bigIntToUint8Array(bigint, lengthBytes) {
  const bytes = new Uint8Array(lengthBytes);
  for (let i = 0; i < lengthBytes; i++) {
    bytes[lengthBytes - i - 1] = Number((bigint >> BigInt(i * 8)) & 0xFFn);
  }
  return bytes;
}

export { BitString, sha256BitString }; // added for the tests