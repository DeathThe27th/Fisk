import "server-only";

export type ResearchAttachment = { name: string; type: string; size: number; text: string };

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TEXT_CHARS = 45_000;

function isTextFile(file: File) {
  return file.type.startsWith("text/") || /\.(txt|md|csv|json|xml|html?)$/i.test(file.name);
}

export async function extractResearchAttachment(file: File): Promise<ResearchAttachment> {
  if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} is larger than the 8 MB research limit.`);
  const buffer = Buffer.from(await file.arrayBuffer());
  let text = "";
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    try {
      text = (await parser.getText()).text;
    } finally {
      await parser.destroy();
    }
  } else if (isTextFile(file)) {
    text = buffer.toString("utf8");
  } else {
    throw new Error(`${file.name} is not a supported research document. Use PDF, TXT, MD, CSV, JSON, XML, or HTML.`);
  }
  const normalized = text.replace(/\u0000/g, "").replace(/\r\n/g, "\n").trim();
  if (!normalized) throw new Error(`${file.name} did not contain readable text.`);
  return { name: file.name, type: file.type || "application/octet-stream", size: file.size, text: normalized.slice(0, MAX_TEXT_CHARS) };
}
