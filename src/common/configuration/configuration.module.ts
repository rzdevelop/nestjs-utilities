import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

interface ConfigurationModuleOptions extends Omit<ModuleMetadata, 'controllers'> {
  configModulesOptions?: ConfigModuleOptions;
}

@Module({})
export class ConfigurationModule {
  static register({ configModulesOptions, ...moduleMetadata }: ConfigurationModuleOptions): DynamicModule {
    return {
      module: ConfigurationModule,
      imports: [ConfigModule.forRoot(configModulesOptions), ...(moduleMetadata.imports || [])],
      providers: [...(moduleMetadata.providers || [])],
      exports: [...(moduleMetadata.exports || [])],
    };
  }
}
