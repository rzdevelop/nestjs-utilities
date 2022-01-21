import { ArgumentsHost, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { EntityNotFoundFilter, NotFoundHandler } from '../../../src/common/exceptions/entity-not-found.filter';

describe('EntityNotFoundFilter', () => {
  describe('when instantiating EntityNotFoundFilter', () => {
    it('should be defined', () => {
      expect(new EntityNotFoundFilter()).toBeDefined();
    });
  });

  describe('when catching an exception', () => {
    let filter: EntityNotFoundFilter;
    beforeEach(() => {
      filter = new EntityNotFoundFilter();
    });

    it('should set NotFound status code and set json response', () => {
      const error = new EntityNotFoundError('EntityClass', 'criteria');
      const json = jest.fn();
      const status = jest.fn().mockReturnValue({ json });
      const getResponse = jest.fn().mockReturnValue({
        status,
      });
      const switchToHttp = jest.fn().mockReturnValue({ getResponse });
      const host = {
        switchToHttp: switchToHttp as ArgumentsHost['switchToHttp'],
      } as ArgumentsHost;

      filter.catch(error, host);

      expect(switchToHttp).toHaveBeenCalledTimes(1);
      expect(getResponse).toHaveBeenCalledTimes(1);
      expect(status).toHaveBeenCalledTimes(1);
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith({
        statusCode: 404,
        name: error.name,
        message: error.message,
      });
    });
  });
});

describe('NotFoundHandler', () => {
  describe('when error.message is NotFound', () => {
    let error: Error;
    beforeEach(() => {
      error = new Error('NotFound');
    });

    it('should throw NotFoundException', () => {
      expect(() => NotFoundHandler(error)).toThrowError(NotFoundException);
    });
  });

  describe('When error.message is not NotFound', () => {
    let error: Error;
    beforeEach(() => {
      error = new Error('Another Error');
    });

    it('should throw InternalServerErrorException', () => {
      expect(() => NotFoundHandler(error)).toThrowError(InternalServerErrorException);
    });
  });
});
