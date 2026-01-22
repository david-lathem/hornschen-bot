import path from "path";
import fs from "fs";
import { getAttachmentPath } from "./path.js";

export async function downloadVideo(
  url: string,
  channelId: string,
  contentType?: string | null,
): Promise<{ filePath: string; ext: string }> {
  const ext = contentType?.split("/").pop();

  if (!ext) throw new Error("Could not get extension of the video");

  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch video: ${res.statusText}`);

  const buffer = Buffer.from(await res.arrayBuffer());

  const folder = getAttachmentPath();

  const fileName = `${channelId}.${ext}`;

  const filePath = path.join(folder, fileName);

  fs.writeFileSync(filePath, buffer);

  return { filePath, ext };
}
