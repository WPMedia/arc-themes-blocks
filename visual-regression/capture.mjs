import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = resolve(__dirname, "screenshots");

const url = process.argv[2];
if (!url) {
	console.error("Usage: node capture.mjs <url>");
	process.exit(1);
}

const viewports = [
	{ width: 320, height: 900, name: "mobile" },
	{ width: 768, height: 1024, name: "tablet" },
	{ width: 1200, height: 900, name: "desktop" },
];

mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
	const page = await browser.newPage({
		viewport: { width: vp.width, height: vp.height },
	});

	console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
	await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

	// Scroll to bottom to trigger lazy-loaded content, then back to top
	await page.evaluate(async () => {
		const delay = (ms) => new Promise((r) => setTimeout(r, ms));
		for (let y = 0; y < document.body.scrollHeight; y += 400) {
			window.scrollTo(0, y);
			await delay(100);
		}
		window.scrollTo(0, 0);
		await delay(500);
	});

	await page.screenshot({
		path: `${screenshotsDir}/${vp.name}.png`,
		fullPage: true,
	});

	await page.close();
}

await browser.close();
console.log("Screenshots saved to", screenshotsDir);
