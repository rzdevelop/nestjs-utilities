import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isNil } from 'ramda';

import { UnknownObject } from '../types';

export function TransformToBoolean(): PropertyDecorator {
  return Transform((param) => (param.obj as UnknownObject<string>)[param.key] === 'true');
}

export function ParseArray({ removeNullOrUndefined = false }: { removeNullOrUndefined: boolean }): PropertyDecorator {
  return Transform((param) => {
    const obj = (param.obj as UnknownObject<string>)[param.key];
    const arr = JSON.parse(obj) as unknown;
    return Array.isArray(arr) ? (removeNullOrUndefined ? arr.filter((v) => !isNil(v)) : arr) : false;
  });
}

@ValidatorConstraint({ name: 'xorConstraint', async: false })
export class XorConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    const constraint = args.constraints[0] as string;
    const value = (args.object as UnknownObject)[constraint];

    return (!!propertyValue && !value) || (!propertyValue && !!value);
  }

  defaultMessage(args: ValidationArguments): string {
    const constraint = args.constraints[0] as string;
    return `Failed XOR relation between "${args.property}" and "${constraint}"`;
  }
}
