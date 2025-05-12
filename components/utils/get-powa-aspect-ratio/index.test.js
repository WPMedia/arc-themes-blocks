import getAspectRatioFromPowa from "./index";

describe("Should resolve the aspect ratio from the html tag ", () => {
	it("resolves 16:9 aspect ratio", () => {
		const powaTag =
			'<div class="powa" id="powa-44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-org="themesinternal" data-env="prod" data-uuid="44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-aspect-ratio="0.562" data-api="prod"></div>';
		const aspectRatio = getAspectRatioFromPowa(powaTag);
		expect(aspectRatio).toEqual("16:9");
	});
	it("resolves 9:16 aspect ratio", () => {
		const powaTag =
			'<div class="powa" id="powa-44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-org="themesinternal" data-env="prod" data-uuid="44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-aspect-ratio="1.778" data-api="prod"></div>';
		const aspectRatio = getAspectRatioFromPowa(powaTag);
		expect(aspectRatio).toEqual("9:16");
	});
	it("resolves 4:3 aspect ratio", () => {
		const powaTag =
			'<div class="powa" id="powa-44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-org="themesinternal" data-env="prod" data-uuid="44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-aspect-ratio="0.75" data-api="prod"></div>';
		const aspectRatio = getAspectRatioFromPowa(powaTag);
		expect(aspectRatio).toEqual("4:3");
	});
	it("resolves 1:1 aspect ratio", () => {
		const powaTag =
			'<div class="powa" id="powa-44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-org="themesinternal" data-env="prod" data-uuid="44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-aspect-ratio="1" data-api="prod"></div>';
		const aspectRatio = getAspectRatioFromPowa(powaTag);
		expect(aspectRatio).toEqual("1:1");
	});
	it("defaults to 16:9 if no aspect ratio is set", () => {
		const powaTag =
			'<div class="powa" id="powa-44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-org="themesinternal" data-env="prod" data-uuid="44fd9ccd-b70c-44c1-a493-3cc296698e5e" data-api="prod"></div>';
		const aspectRatio = getAspectRatioFromPowa(powaTag);
		expect(aspectRatio).toEqual("16:9");
	});
});
