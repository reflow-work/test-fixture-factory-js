export class FixtureFactory<T extends NonNullable<any>> {
  constructor(
    private generator: (input: any) => Required<T>,
    private mutator: (original: T, input: any) => T = merge
  ) {}

  create(input?: any): T {
    return this.mutator(this.generator(input), input);
  }

  createList(count: number, inputs: any[] = []): T[] {
    let result = [];

    for (let i = 0; i < count; i++) {
      result.push(this.create(inputs[i]));
    }

    return result;
  }
}

function merge<T>(original: T, overrides: any): T {
  if (overrides === undefined) {
    return original;
  }

  if (typeof original === 'object' && typeof overrides === 'object') {
    return mergeObject(original as any, overrides as Partial<any>);
  } else if (typeof original === typeof overrides) {
    return overrides;
  } else {
    return original;
  }
}

function mergeObject<T extends object>(obj1: T, obj2: Partial<T>): T {
  const filteredObj2 = filteredObject(obj2, Object.keys(obj1));

  return Object.assign(obj1, filteredObj2);
}

function filteredObject(obj: object, keys: string[]): object {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
}
