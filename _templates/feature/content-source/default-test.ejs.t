---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/sources/<%= h.inflection.dasherize(content_source_name) %>/index.test.js
---
import contentSource from './index';

jest.mock("fusion:environment", () => ({
	CONTENT_BASE: "",
}));

jest.mock("axios", () => ({
	__esModule: true,
	default: jest.fn((data) => Promise.resolve({ data })),
}));

describe('Test <%= h.changeCase.title(content_source_name) %> content source', () => {
  it('should build the correct url', async () => {
	const key = {
		'arc-site': 'arc-site',
		input: 'test-input',
	};
	const contentSourceRequest = await contentSource.fetch(key);

	expect(contentSourceRequest.url).toEqual(
		`/-- API - ENDPOINT URI HERE --?website=${key["arc-site"]}`
	);
  });

  it('should transform data', () => {
	 const key = {
		'arc-site': 'arc-site',
		input: 'test-input',
	 };
	 const dataTransform = contentSource.transform(key);

	 expect(dataTransform).toEqual(key);
  });
});
