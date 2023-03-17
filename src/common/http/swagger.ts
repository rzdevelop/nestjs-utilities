import { HttpStatus, INestApplication } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiResponseMetadata,
  ApiTags,
  ApiUnauthorizedResponse,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { ApiParam } from '@nestjs/swagger';

export interface SwaggerOptions {
  version?: string;
  addBearerAuth?: boolean;
  tags?: string[];
  endpoint?: string;
  title?: string;
}

export const defaultSwaggerOptions: Required<SwaggerOptions> = {
  version: 'Not set',
  tags: [],
  endpoint: 'swagger',
  title: 'API',
  addBearerAuth: false,
};

export const useSwagger = (app: INestApplication, options: SwaggerOptions = defaultSwaggerOptions): void => {
  const { addBearerAuth, endpoint, tags, title, version } = defaultSwaggerOptions;

  const documentBuilder = new DocumentBuilder()
    .setTitle(options.title ?? title)
    .setVersion(options.version ?? version)
    .addTag('Root');

  if (options.addBearerAuth ?? addBearerAuth) {
    documentBuilder.addBearerAuth();
  }

  (options.tags ?? tags).forEach((tag) => documentBuilder.addTag(tag));

  const api = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, api);

  SwaggerModule.setup(options.endpoint ?? endpoint, app, document);
};

type DecoratorReturnType = ReturnType<typeof applyDecorators>;

export const SwaggerController = (tag: string): DecoratorReturnType => applyDecorators(ApiBearerAuth(), ApiTags(tag));

export interface SwaggerParamOptions {
  controllerName: string;
  idType: string;
}

export const SwaggerDecorator = (enable: boolean, tag = ''): DecoratorReturnType =>
  applyDecorators(...(enable ? [SwaggerController(tag)] : []));

export const SwaggerParam = (
  paramIdName?: string,
  body?: MethodDecorator,
  swagger?: SwaggerParamOptions,
): DecoratorReturnType =>
  applyDecorators(
    ...(!!swagger
      ? [
          ...(paramIdName
            ? [
                ApiParam({
                  name: paramIdName,
                  schema: { type: swagger.idType },
                }),
              ]
            : []),
          ...(body ? [body] : []),
        ]
      : []),
  );

export enum ResponseDescription {
  OK = 'The request was successful',
  CREATED = 'The resource was created',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'No entity was found matching the given id',
  UNAUTHORIZED = 'Authentication failed',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}

export const SwaggerResponsesDecorator = (
  responseStatusCode: HttpStatus,
  responseDescription: ResponseDescription,
  responseType?: ApiResponseMetadata['type'],
): DecoratorReturnType =>
  applyDecorators(
    ApiResponse({
      status: responseStatusCode,
      description: responseDescription,
      type: responseType,
    }),
    ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST }),
    ApiInternalServerErrorResponse({
      description: ResponseDescription.INTERNAL_SERVER_ERROR,
    }),
    ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED }),
  );
