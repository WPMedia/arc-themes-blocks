const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "style-token-descriptions.json");
const inputJson = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

function createStyleTokensFile(blockName, tokens) {
	const folderPath = path.join(__dirname, "..", "blocks", blockName);
	const filePath = `${folderPath}/STYLE-TOKENS.md`;

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}

	let content = `## Style Tokens\n\nThis block provides the following style tokens for customization.\n\n| **Token** | **Description** |\n| --- | --- |\n`;

	for (const tokenName in tokens) {
		let { description } = tokens[tokenName];
		if (!description.endsWith(".")) {
			description += ".";
		}
		content += `| ${tokenName} | ${description} |\n`;
	}

	fs.writeFileSync(filePath, content, "utf8");
}

for (const blockName in inputJson) {
	createStyleTokensFile(blockName, inputJson[blockName]);
}
