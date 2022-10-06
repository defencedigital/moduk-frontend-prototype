import Header from './header';

describe('MOD.UK header()', () => {
  describe('Does not throw an error', () => {
    it('if no document exists', () => {
      Header();
    });
  });
});
