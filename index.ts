export class FixtureFactory<T extends NonNullable<any>> {
  constructor(
    private generator: (input: any) => T,
    private mutator: (original: T, input: any) => T = merge
  ) {}

  create(input?: any): T {
    return this.mutator(this.generator(input), input);
  }
}

export function identity(value: any) {
  return value;
}

function merge<T>(original: T, overrides: any): T {
  if (overrides === undefined) {
    return original;
  }

  if (typeof original === 'object') {
    return mergeObject(original as any, overrides as Partial<any>);
  } else {
    return overrides;
  }
}

function mergeObject<T extends object>(obj1: T, obj2: Partial<T>): T {
  const result = { ...obj1 }; // obj1의 복사본 생성
  for (const key in result) {
    if (key in obj2) {
      (result as any)[key] = (obj2 as any)[key];
    }
  }
  return result;
}
