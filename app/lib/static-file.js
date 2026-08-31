import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const TYPES = {
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
};

export function staticFile(name) {
  const ext = name.split(".").pop();
  const candidates = [
    join(process.cwd(), "public", name),
    join(process.cwd(), name),
  ];
  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    throw new Error(`missing static file ${name}`);
  }
  const body = readFileSync(path, "utf8");
  return new Response(body, {
    headers: {
      "content-type": TYPES[ext] || "application/octet-stream",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
