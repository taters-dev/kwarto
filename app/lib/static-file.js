import { readFileSync } from "node:fs";
import { join } from "node:path";

const TYPES = {
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
};

export function staticFile(name) {
  const ext = name.split(".").pop();
  const body = readFileSync(join(process.cwd(), name), "utf8");
  return new Response(body, {
    headers: {
      "content-type": TYPES[ext] || "application/octet-stream",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
