import { ConfigPart } from "../interfaces/Config";

export function uniqByPartName<T extends ConfigPart>(
  accumulator: T[],
  currentValue: T
): T[] {
  return accumulator.some((part) => part.name === currentValue.name)
    ? [...accumulator]
    : [...accumulator, currentValue];
}
