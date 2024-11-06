export function typeguard_isFile(value: unknown): value is File {
  return value instanceof File;
}
export function typeguard_isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function typeguard_isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
