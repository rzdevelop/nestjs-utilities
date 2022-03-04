import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

interface ConfigurationModuleOptions extends Omit<ModuleMetadata, 'controllers'> {
  configModulesOptions?: ConfigModuleOptions;
}

@Module({})
export class ConfigurationModule {
  static register({ configModulesOptions, ...moduleMetadata }: ConfigurationModuleOptions): DynamicModule {
    const configModule = ConfigModule.forRoot(configModulesOptions);
    return {
      module: ConfigurationModule,
      imports: [configModule, ...(moduleMetadata.imports || [])],
      providers: [...(moduleMetadata.providers || [])],
      exports: [configModule, ...(moduleMetadata.exports || [])],
    };
  }
}
