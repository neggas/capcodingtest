import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CountryCode } from 'src/utils/constants';

@ValidatorConstraint({ async: false })
export class IsCountryConstraint implements ValidatorConstraintInterface {
  validate(country: any): boolean {
    return CountryCode.includes(country);
  }

  defaultMessage(): string {
    return 'Country must be a valid country';
  }
}

export function IsCountry(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCountryConstraint,
    });
  };
}
