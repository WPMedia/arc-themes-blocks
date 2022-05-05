import formatEmbedMarkup from "./formatEmbedMarkup";

describe("If the embed html", () => {
	it("is an empty string then return empty string regardless of autoplay", () => {
		const embedHTMLOutput = formatEmbedMarkup("", true, false);

		expect(embedHTMLOutput).toBe("");
	});

	it("is undefined then return empty string regardless of autoplay", () => {
		const embedHTMLOutput = formatEmbedMarkup(undefined, false, false);

		expect(embedHTMLOutput).toBe("");
	});

	it("is null then return empty string regardless of autoplay", () => {
		const embedHTMLOutput = formatEmbedMarkup(null, true, false);

		expect(embedHTMLOutput).toBe("");
	});
});

describe("If the embed html is valid", () => {
	it("autoplay is enabled, then add autoplay props", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
			' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
			'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		const embedHTMLOutput = formatEmbedMarkup(testEmbed, true, false);
		expect(embedHTMLOutput).toMatch(/data-autoplay="true"/i);
		expect(embedHTMLOutput).toMatchInlineSnapshot(
			'"<div class=\\"powa\\" id=\\"powa-e924\\" data-org=\\"corecomponents\\" data-env=\\"prod\\" data-uuid=\\"e924e51b\\" data-aspect-ratio=\\"0.562\\" data-api=\\"prod\\" data-autoplay=\\"true\\" data-muted=\\"true\\"><script src=\\"//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents\\"></script></div>"'
		);
	});
	it("playthrough is enabled and autoplay is enabled", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
			' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
			'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		const embedHTMLOutput = formatEmbedMarkup(testEmbed, true, true);
		expect(embedHTMLOutput).toMatch(/data-autoplay="true"/i);
		expect(embedHTMLOutput).toMatch(/data-playthrough="true"/i);
		expect(embedHTMLOutput).toMatch(/data-muted="true"/i);

		expect(embedHTMLOutput).toMatchInlineSnapshot(
			'"<div class=\\"powa\\" id=\\"powa-e924\\" data-org=\\"corecomponents\\" data-env=\\"prod\\" data-uuid=\\"e924e51b\\" data-aspect-ratio=\\"0.562\\" data-api=\\"prod\\" data-autoplay=\\"true\\" data-muted=\\"true\\" data-playthrough=\\"true\\"><script src=\\"//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents\\"></script></div>"'
		);
	});
	it("neither playthrough nor autoplay is enabled", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
			' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
			'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		const embedHTMLOutput = formatEmbedMarkup(testEmbed, false, false);
		expect(embedHTMLOutput).not.toMatch(/data-autoplay="true"/i);
		expect(embedHTMLOutput).not.toMatch(/data-playthrough="true"/i);
		expect(embedHTMLOutput).not.toMatch(/data-muted="true"/i);
		expect(embedHTMLOutput).toMatchInlineSnapshot(
			'"<div class=\\"powa\\" id=\\"powa-e924\\" data-org=\\"corecomponents\\" data-env=\\"prod\\" data-uuid=\\"e924e51b\\" data-aspect-ratio=\\"0.562\\" data-api=\\"prod\\"><script src=\\"//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents\\"></script></div>"'
		);
	});
	it("passes in an override aspect ratio", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
			' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
			'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		// 0.3 target aspect ratio
		const embedHTMLOutput = formatEmbedMarkup(testEmbed, false, false, 0.3);

		expect(embedHTMLOutput).toMatch(/data-aspect-ratio="0.3"/i);
		// 0.562 was passed in default
		expect(embedHTMLOutput).not.toMatch(/data-aspect-ratio="0.562"/i);
	});
	it("handles a non-powa parent div correctly", () => {
		const testEmbed =
			'<div class="goldfish-player">' +
			'<div class="powa" id="powa-ff" data-org="ffff" data-uuid="ffff" data-aspect-ratio="0.562">' +
			'<script src="//ff.cloudfront.net/prod/powaBoot.js"></script>' +
			"</div>" +
			"</div>";

		const embedHTMLOutput = formatEmbedMarkup(testEmbed, true, true);

		// ensure no parent autoplay is added
		expect(embedHTMLOutput.match(/<div class="goldfish-player">/i)[0]).toBe(
			'<div class="goldfish-player">'
		);
		expect(embedHTMLOutput).toMatchInlineSnapshot(
			`"<div class=\\"goldfish-player\\"><div class=\\"powa\\" id=\\"powa-ff\\" data-org=\\"ffff\\" data-uuid=\\"ffff\\" data-aspect-ratio=\\"0.562\\" data-autoplay=\\"true\\" data-muted=\\"true\\" data-playthrough=\\"true\\"><script src=\\"//ff.cloudfront.net/prod/powaBoot.js\\"></script></div></div>"`
		);
	});
});
