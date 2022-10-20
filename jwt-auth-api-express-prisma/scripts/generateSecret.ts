// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import crypto from "crypto";
const key1 = crypto.randomBytes(64).toString("base64");
const key2 = crypto.randomBytes(64).toString("base64");
console.table({ key1, key2 });
