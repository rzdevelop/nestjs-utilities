import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  if (options ?? addBearerAuth) {
    documentBuilder.addBearerAuth();
  }

  (options.tags ?? tags).forEach((tag) => documentBuilder.addTag(tag));

  const api = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, api);

  SwaggerModule.setup(options.endpoint ?? endpoint, app, document);
};
