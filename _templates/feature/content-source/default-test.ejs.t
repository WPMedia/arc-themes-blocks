---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/sources/<%= h.inflection.dasherize(content_source_name) %>/index.test.js
---
import contentSource from './index';

describe('Test <%= h.changeCase.title(content_source_name) %> content source', () => {
  it('should build the correct url', () => {
    const key = {
      'arc-site': 'arc-site',
      input: 'test-input',
    };
    const url = contentSource.resolve(key);

    expect(url).toEqual(`${key['arc-site']}-${key.input}`);
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
