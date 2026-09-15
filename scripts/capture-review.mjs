import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".impeccable/review", { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const shot of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 120_000 });
  await page.screenshot({ path: `.impeccable/review/${shot.name}.png`, fullPage: true });
  console.log(`${shot.name}: ${await page.title()} — ${await page.locator("body").innerText().then((text) => text.length)} text characters`);
  await page.close();
}

for (const shot of [
  { name: "desk", width: 1440, height: 1000 },
  { name: "desk-mobile", width: 390, height: 844 },
]) {
  const desk = await browser.newPage({ viewport: { width: shot.width, height: shot.height }, colorScheme: "dark" });
  await desk.goto("http://127.0.0.1:3000/desk", { waitUntil: "networkidle", timeout: 120_000 });
  await desk.screenshot({ path: `.impeccable/review/${shot.name}.png`, fullPage: true });
  console.log(`${shot.name}: ${await desk.title()} — ${await desk.locator("body").innerText().then((text) => text.length)} text characters`);
  await desk.close();
}

await browser.close();
