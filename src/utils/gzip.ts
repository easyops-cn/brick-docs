import { base64ToBytes, bytesToBase64 } from "./b64Unicode";

export const GZIP_HASH_PREFIX = "#gzip,";

export async function compress(str: string) {
  const blob = new Blob([str], { type: "text/plain" });
  const stream = blob.stream().pipeThrough(new CompressionStream("gzip"));
  const compressedBlob = await new Response(stream).blob();
  return bytesToBase64(new Uint8Array(await compressedBlob.arrayBuffer()));
}

export async function decompress(str: string) {
  const bytes = base64ToBytes(str);
  const blob = new Blob([bytes], { type: "text/plain" });
  const stream = blob.stream().pipeThrough(new DecompressionStream("gzip"));
  const decompressedBlob = await new Response(stream).blob();
  return decompressedBlob.text();
}
