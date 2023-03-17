import { INestApplication } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
