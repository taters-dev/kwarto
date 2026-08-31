import { staticFile } from "../lib/static-file";

export const dynamic = "force-static";

export function GET() {
  return staticFile("guests.js");
}
