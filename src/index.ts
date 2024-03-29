type Undefinedable<T> = T | undefined;
type Input<T, R> = Undefinedable<
  T extends { [key: string]: unknown } ? Partial<T> & R : R
>;

export class FixtureFactory<T extends NonNullable<any>, R = unknown> {
  constructor(
    private generator: (input: Input<T, R>) => Required<T>,
    private mutator: (original: T, input: Input<T, R>) => T = merge
  ) {}

  create(input: Input<T, R> = undefined): T {
    return this.mutator(this.generator(input), input);
  }

  createList(count: number, inputs: Input<T, R>[] = []): T[] {
    let result = [];

    for (let i = 0; i < count; i++) {
      result.push(this.create(inputs[i]));
    }

    return result;
  }
}

function merge<T, R>(original: T, overrides: Undefinedable<R>): T {
  if (overrides === undefined) {
    return original;
  }

  if (typeof original === 'object' && typeof overrides === 'object') {
    // TODO: fix types
    return mergeObject(original as any, overrides as any);
  } else if (typeof original === typeof overrides) {
    return overrides as T;
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
