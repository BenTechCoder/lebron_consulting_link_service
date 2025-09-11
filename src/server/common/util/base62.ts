// Based off https://base62.org/javascript_sample/

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function base62Encode(input: string) {
  if (input.length === 0) {
    return '';
  }

  let value = BigInt('0x' + Buffer.from(input, 'utf8').toString('hex'));
  let result = '';

  while (value > 0) {
    const divmod: bigint = value % 62n;
    // !NOTE: can safely convert to number becuase of use with sqlite IDs
    result = BASE62[Number(divmod)] + result;
    value = value / 62n;
  }

  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) === 0) {
      result = BASE62[0] + result;
    } else {
      break;
    }
  }
  return result;
}

function base62Decode(input: string) {
  if (input.length === 0) {
    return '';
  }

  let value = BigInt(0);
  for (let i = 0; i < input.length; i++) {
    value = value * 62n + BigInt(BASE62.indexOf(input[i]));
  }

  let hex = value.toString(16);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  const bytes = Buffer.from(hex, 'hex');
  let leadingZeroes = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === BASE62[0]) {
      leadingZeroes++;
    } else {
      break;
    }
  }

  const result = Buffer.concat([Buffer.alloc(leadingZeroes), bytes]);
  return result.toString('utf8');
}

export { base62Encode, base62Decode };

// Usage
// const input = '28';
// const encoded = encode(input);
// console.log('Encoded:', encoded);

// const decoded = decode(encoded);
// console.log('Decoded:', decoded);
