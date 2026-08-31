import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

export async function servePublicFile(name, contentType) {
  const candidates = [
    path.join(process.cwd(), "public", name),
    path.join(process.cwd(), name),
  ];
  const file = candidates.find((p) => existsSync(p));
  if (!file) {
    return new Response("Not found", { status: 404 });
  }
  const body = await readFile(file);
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
