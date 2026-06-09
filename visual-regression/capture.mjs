import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = resolve(currentDir, "screenshots");

const baseUrl = process.argv[2];
const deploymentId = process.argv[3];

if (!baseUrl) {
	console.error("Usage: node capture.mjs <base-url> [deployment-id]");
	process.exit(1);
}

const pages = JSON.parse(readFileSync(resolve(currentDir, "pages.json"), "utf8"));

const viewports = [
	{ width: 320, height: 900, name: "mobile" },
	{ width: 768, height: 1024, name: "tablet" },
	{ width: 1200, height: 900, name: "desktop" },
];

mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch();

for (const page of pages) {
	// Slug the page name for filenames: "Small Promo Block" -> "small-promo-block"
	const slug = page.name.toLowerCase().replace(/\s+/g, "-");
	const pageDir = resolve(screenshotsDir, slug);
	mkdirSync(pageDir, { recursive: true });

	for (const vp of viewports) {
		const browserPage = await browser.newPage({
			viewport: { width: vp.width, height: vp.height },
		});

		let url = `${baseUrl}${page.path}`;
		if (deploymentId) {
			url += `${url.includes("?") ? "&" : "?"}d=${deploymentId}`;
		}

		console.log(`Capturing ${page.name} - ${vp.name} (${vp.width}x${vp.height})...`);
		await browserPage.goto(url, { waitUntil: "networkidle", timeout: 60000 });

		// Scroll to bottom to trigger lazy-loaded content, then back to top
		await browserPage.evaluate(async () => {
			const delay = (ms) => new Promise((r) => setTimeout(r, ms));
			for (let y = 0; y < document.body.scrollHeight; y += 400) {
				window.scrollTo(0, y);
				await delay(100);
			}
			window.scrollTo(0, 0);
			await delay(500);
		});

		await browserPage.screenshot({
			path: `${pageDir}/${vp.name}.png`,
			fullPage: true,
		});

		await browserPage.close();
	}
}

await browser.close();
console.log("Screenshots saved to", screenshotsDir);
