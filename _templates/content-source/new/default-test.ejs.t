---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/sources/<%= h.inflection.dasherize(block_name) %>.test.js
---
import contentSource from './<%= h.inflection.dasherize(block_name) %>';

describe('Test <%= h.changeCase.title(block_name) %> content source', () => {
  it('should build the correct url', () => {
    const key = {
      'arc-site': 'arc-site',
      input: 'test-input',
    };
    const url = contentSource.resolve(key);

    expect(url).toEqual(`${key['arc-site']}-${key.input}`);
  });

  it('should tansform data', () => {
    const key = {
      'arc-site': 'arc-site',
      input: 'test-input',
    };
    const dataTransform = contentSource.transform(key);

    expect(dataTransform).toEqual(key);
  });
});
