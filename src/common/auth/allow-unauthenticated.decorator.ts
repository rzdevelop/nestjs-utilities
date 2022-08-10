import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ALLOW_UNAUTHENTICATED_KEY = 'allow_unauthenticated';

export const AllowUnauthenticated = (): CustomDecorator<string> => SetMetadata(ALLOW_UNAUTHENTICATED_KEY, true);
