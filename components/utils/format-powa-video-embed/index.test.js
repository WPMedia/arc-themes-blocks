import formatPowaVideoEmbed from ".";

it("returns an empty string if empty embed markup", () => {
	expect(formatPowaVideoEmbed()).toMatchInlineSnapshot(`""`);
});

it("returns a non-empty string if there are no powa fields", () => {
	expect(formatPowaVideoEmbed('<div class="powa"></div>')).toMatchInlineSnapshot(
		`"<div class="powa"></div>"`,
	);
});

it("returns a powa embed code with fields attached with data-", () => {
	expect(
		formatPowaVideoEmbed('<div class="powa" ></div>', {
			powaVideoId: "12345",
		}),
	).toMatchInlineSnapshot(`"<div class="powa" data-powavideoid="12345"></div>"`);
});

it("returns a powa embed code with fields that are defined attached with data-", () => {
	expect(
		formatPowaVideoEmbed('<div class="powa" ></div>', {
			powaVideoId: "12345",
			bad: undefined,
		}),
	).toMatchInlineSnapshot(`"<div class="powa" data-powavideoid="12345"></div>"`);
});
