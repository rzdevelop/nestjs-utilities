import { EntityNotFoundFilter } from '../../../common/exceptions/entity-not-found.filter';

describe('EntityNotFoundFilter', () => {
  it('should be defined', () => {
    expect(new EntityNotFoundFilter()).toBeDefined();
  });
});
