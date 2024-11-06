import { Property } from '@/models/interfaces/property';
import { User } from '@/models/interfaces/user';

export function typeguard_isFile(value: unknown): value is File {
  return value instanceof File;
}
export function typeguard_isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function typeguard_isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
export function typeguard_isProperty(value: unknown): value is Property {
  return (value as Property).id !== undefined;
}

export function typeguard_isUser(value: unknown): value is User {
  return (value as User).id !== undefined;
}
