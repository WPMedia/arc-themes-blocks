import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const pages = JSON.parse(readFileSync(resolve(currentDir, "pages.json"), "utf8"));
const storiesDir = resolve(currentDir, "stories");
mkdirSync(storiesDir, { recursive: true });

for (const page of pages) {
	const slug = page.name.toLowerCase().replace(/\s+/g, "-");
	const componentName = page.name.replace(/\s+/g, "");

	const story = `import React from "react";

export default {
	title: "${page.name}",
};

export const Mobile = () => (
	<img src="/${slug}/mobile.png" alt="${page.name} - Mobile" style={{ display: "block" }} />
);

export const Tablet = () => (
	<img src="/${slug}/tablet.png" alt="${page.name} - Tablet" style={{ display: "block" }} />
);

export const Desktop = () => (
	<img src="/${slug}/desktop.png" alt="${page.name} - Desktop" style={{ display: "block" }} />
);
`;

	const filename = resolve(storiesDir, `${componentName}.stories.jsx`);
	writeFileSync(filename, story);
	console.log(`Generated ${filename}`);
}
