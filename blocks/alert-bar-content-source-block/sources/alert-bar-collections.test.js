import contentSource from './alert-bar-collections';

describe('the collections content source block', () => {
  describe('when a website param is provided', () => {
    it('should build the correct url', () => {
      const url = contentSource.resolve({
        'arc-site': 'the-sun',
      });

      expect(url).toEqual('content/v4/collections?_id=VTKOTRJXEVATHG7MELTPZ2RIBU&website=the-sun&from=0&size=1&published=true');
    });
  });

  /*
  TODO: Write tests for handling lack of arc site, which will then be replaced by content alias
  Currently blocked until Content API releases the related ticket
  */
});
