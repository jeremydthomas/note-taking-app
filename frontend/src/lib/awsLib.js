import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });
  return stored.key;
}

export async function s3Delete(key) {
	const removed = await Storage.vault.remove(key);
	return removed
}