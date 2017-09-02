const assert = require('assert');
const Album = require('../../models/album');

describe('Album model: ', () => {
  it('saves a album', (done) => {
    const album = new Album({ title: "Guns N' Roses" });

    album.save()
      .then(() => {
        // Has album been saved successfully?
        assert(!album.isNew);
        done();
      });
  });

  it('requires an album title', () => {
    const album = new Album({ title: undefined });
    const validationResult = album.validateSync();
    //const message = validationResult.errors.title.message;
    const { message } = validationResult.errors.title;

    assert(message === 'Title is required.');
  });

});
