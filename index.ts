export class FixtureFactory<R extends Object> {
  constructor(private generator: (attrs: Object) => R) { }

  create(attrs: Object = {}): R {
    return merge<R>(this.generator(attrs), attrs)
  }
}

function merge<T extends Object>(obj1: T, obj2: Object): T {
  const result = { ...obj1 };  // obj1의 복사본 생성
  for (const key in result) {
    if (key in obj2) {
      (result as any)[key] = (obj2 as any)[key];
    }
  }
  return result;
}
