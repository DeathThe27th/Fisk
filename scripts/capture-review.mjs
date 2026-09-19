import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir(".impeccable/review", { recursive: true });
const browser = await chromium.launch({ headless: true });
async function capture(page,width,path){const client=await page.context().newCDPSession(page);const height=Math.ceil(await page.evaluate(()=>document.body.getBoundingClientRect().height));const shot=await client.send("Page.captureScreenshot",{format:"png",fromSurface:true,captureBeyondViewport:true,clip:{x:0,y:0,width,height,scale:1}});await writeFile(path,Buffer.from(shot.data,"base64"));await client.detach()}
async function settle(page){await page.evaluate(()=>document.fonts.ready);for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(120)}await page.evaluate(()=>window.scrollTo(0,0));await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete),{timeout:30000}).catch(()=>{});await page.waitForTimeout(1000)}

for (const shot of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded", timeout: 120_000 });
  await settle(page);
  await capture(page,shot.width,`.impeccable/review/${shot.name}.png`);
  console.log(`${shot.name}: ${await page.title()} — ${await page.locator("body").innerText().then((text) => text.length)} text characters`);
  await page.close();
}

for (const shot of [
  { name: "desk", width: 1440, height: 1000 },
  { name: "desk-mobile", width: 390, height: 844 },
]) {
  const desk = await browser.newPage({ viewport: { width: shot.width, height: shot.height }, colorScheme: "dark", reducedMotion: "reduce" });
  await desk.goto("http://127.0.0.1:3000/desk", { waitUntil: "domcontentloaded", timeout: 120_000 });
  await settle(desk);
  await capture(desk,shot.width,`.impeccable/review/${shot.name}.png`);
  console.log(`${shot.name}: ${await desk.title()} — ${await desk.locator("body").innerText().then((text) => text.length)} text characters`);
  await desk.close();
}

const identity = await browser.newPage({viewport:{width:720,height:360}});
await identity.setContent(`<main style="font:14px monospace;display:flex;gap:36px;padding:28px;background:#f2f2f2;color:#343434"><div>Light${[16,24,32].map(size=>`<p><img src="http://127.0.0.1:3000/fisk-mark-light.svg" width="${size}" height="${size}"> ${size}px</p>`).join('')}</div><div style="background:#343434;color:#f2f2f2;padding:20px">Dark${[16,24,32].map(size=>`<p><img src="http://127.0.0.1:3000/fisk-mark-dark.svg" width="${size}" height="${size}"> ${size}px</p>`).join('')}</div><div>Favicon<p><img src="http://127.0.0.1:3000/icon.svg" width="16" height="16"> 16px</p><p><img src="http://127.0.0.1:3000/icon.svg" width="32" height="32"> 32px</p></div></main>`);
await identity.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));
await identity.screenshot({path:'.impeccable/review/identity.png'});
await browser.close();
