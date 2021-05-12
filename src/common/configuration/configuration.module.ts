import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigFactory, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { CustomLoggerModule } from '../custom-logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ConfigurationModuleOptions<ObjectSchema = any> extends Omit<ModuleMetadata, 'controllers'> {
  load?: ConfigFactory[];
  validationSchema?: Joi.ObjectSchema<ObjectSchema>;
}

@Module({})
export class ConfigurationModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static register<ObjectSchema = any>({
    load,
    validationSchema,
    ...moduleMetadata
  }: ConfigurationModuleOptions<ObjectSchema>): DynamicModule {
    return {
      module: ConfigurationModule,
      imports: [
        CustomLoggerModule.register(),
        ConfigModule.forRoot({
          load,
          validationSchema,
        }),
        ...(moduleMetadata.imports || []),
      ],
      providers: [...(moduleMetadata.providers || [])],
      exports: [...(moduleMetadata.exports || [])],
    };
  }
}
