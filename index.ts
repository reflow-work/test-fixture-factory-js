import { merge as _merge } from 'lodash-es'

export function builderFactory<R extends Object>(generator: (attrs: Object) => R): ((attrs?: {}) => R) {
  return (attrs: Object = {}): R => {
    return merge<R>(generator(attrs), attrs)
  }
}

// function merge<R>(testData: R, attrs: Object): R {
//   return _merge({}, testData, attrs)
// }

function merge<T extends Object>(obj1: T, obj2: Object): T {
  const result = { ...obj1 };  // obj1의 복사본 생성
  for (const key in result) {
    if (key in obj2) {
      (result as any)[key] = (obj2 as any)[key];
    }
  }
  return result;
}
