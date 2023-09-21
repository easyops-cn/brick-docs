// https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem

export function b64EncodeUnicode(str: string): string {
  return bytesToBase64(new TextEncoder().encode(str));
}

export function b64DecodeUnicode(str: string): string {
  return new TextDecoder().decode(base64ToBytes(str));
}

export function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

export function bytesToBase64(bytes: Uint8Array): string {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(binString);
}
