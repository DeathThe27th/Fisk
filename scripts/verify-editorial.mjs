import { chromium } from "playwright";
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:"reduce"});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000',{waitUntil:'domcontentloaded',timeout:180000});
if(await page.getByText('Market Pulse',{exact:true}).count())throw Error('Obsolete Market Pulse label remains');
if(await page.locator('.ed-horizon,.ed-story').count())throw Error('Obsolete horizon or story section remains');
if(await page.locator('.ed-source-pause').count())throw Error('Obsolete source pause control remains');
const faq=page.getByRole('button',{name:'Where does its research come from?'});await faq.click();
if(await faq.getAttribute('aria-expanded')!=='true')throw Error('FAQ did not expand');
await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'Open navigation'}).click();
if(!await page.getByRole('navigation',{name:'Expanded navigation'}).isVisible())throw Error('Menu did not open');
await page.getByRole('button',{name:'Close navigation'}).click();
const storyButtons=page.locator('.ed-news-image');const storyCount=await storyButtons.count();
if(await storyButtons.count()){await storyButtons.first().click();await page.getByRole('dialog',{name:'Story evidence'}).waitFor();await page.keyboard.press('Escape');if(await page.getByRole('dialog',{name:'Story evidence'}).count())throw Error('Story drawer did not close');}
for(const width of [1440,390]){await page.setViewportSize({width,height:844});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);if(overflow)throw Error(`Overflow at ${width}`)}
let requests=0;await page.route('**/api/research',async route=>{requests++;await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Verification: provider temporarily unavailable'})})});
await page.goto('http://127.0.0.1:3000/desk?q=Compare%20NVDA%20bull%20and%20bear%20evidence',{waitUntil:'domcontentloaded',timeout:180000});
await page.getByRole('alert').waitFor({timeout:30000});if(requests!==1)throw Error(`Expected one initial research request, got ${requests}`);
await page.getByRole('button',{name:'Ask Fisk',exact:true}).click();if(await page.locator('#desk-composer-input').isVisible())throw Error('Bottom sheet did not collapse');await page.getByRole('button',{name:'Ask Fisk',exact:true}).click();if(!await page.locator('#desk-composer-input').isVisible())throw Error('Bottom sheet did not reopen');
if(await page.locator('.effort-chip').count())throw Error('Unwired effort control remains');
if(await page.locator('.fisk-avatar .fisk-cat').first().evaluate(e=>getComputedStyle(e).color)!=='rgb(242, 242, 242)')throw Error('Assistant mark lacks inverse contrast');
if(errors.length)throw Error(errors.join("\n"));
console.log(JSON.stringify({obsoleteSections:'removed',faq:'passed',menu:'passed',sourcePause:'removed',newsDrawer:storyCount?'passed':'feed unavailable',overflow:'none',initialResearch:'one request; honest provider error rendered',mobileBottomSheet:'passed',browserErrors:errors},null,2));
await browser.close();
