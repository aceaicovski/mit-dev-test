export function getChangedValues<T extends Record<string, any>>(
  original: T,
  updated: T
): Partial<T> {
  return Object.entries(updated).reduce((acc, [key, value]) => {
    if (original[key as keyof T] !== value && value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

