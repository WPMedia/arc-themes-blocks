import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Produces the blocks.json consumed by `@arc-fusion/cli` (`fusion start`/`build`).
//
// Themes uses blocks.json as the SOLE property source (it bypasses
// properties/index.env), so it must carry both the block list AND the
// siteProperties the bundle renders with. Rather than hand-maintain that, we
// pull the canonical file from the public Themes-V2-Starter repo at runtime and
// patch in the bits this visual-regression bundle needs.
//
// The themes-blocks version is whatever themesReleaseVersion the fetched
// blocks.json declares — it is the single source of truth, not overridden here.
//
// Env overrides (optional):
//   BLOCKS_JSON_URL      -> source URL (defaults to Themes-V2-Starter main)

const currentDir = dirname(fileURLToPath(import.meta.url));
// The Fusion build work directory is this folder (where @arc-fusion/cli runs).
const workDir = (file) => resolve(currentDir, file);

const blocksJsonUrl =
	process.env.BLOCKS_JSON_URL ||
	"https://raw.githubusercontent.com/arcxp/Themes-V2-Starter/main/blocks.json";

// 1. Fetch blocks.json from the public Themes starter repo (no auth needed —
//    GITHUB_TOKEN is only required later to install the private @wpmedia/@arc-fusion
//    packages, not to pull this file).
const blocksJsonRes = await fetch(blocksJsonUrl);
if (!blocksJsonRes.ok) {
	throw new Error(`Failed to fetch blocks.json from ${blocksJsonUrl}: ${blocksJsonRes.status}`);
}
const blocksJson = await blocksJsonRes.json();

// 2. The published themes-blocks version is taken as-is from the fetched
//    blocks.json (themesReleaseVersion). Not overridden here.

// 3. Inject the site properties this test bundle expects. Themes reads these
//    directly from blocks.json. Customize as the restored data bundle requires.
blocksJson.values ??= {};
blocksJson.values.default ??= {};
blocksJson.values.default.siteProperties ??= {};

// 4. Write it into the build work directory so `fusion build`/`start` pick it up.
writeFileSync(workDir("blocks.json"), `${JSON.stringify(blocksJson, null, 2)}\n`);
console.log(
	`Wrote blocks.json (${blocksJson.blocks?.length ?? 0} blocks, themesReleaseVersion=${blocksJson.themesReleaseVersion}) to ${workDir("blocks.json")}`,
);
