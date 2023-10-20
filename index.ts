import { merge as _merge } from 'lodash-es'

export function builderFactory<R>(generator: (attrs: Object) => R): ((attrs?: {}) => R) {
  return (attrs: Object = {}): R => {
    return merge(generator(attrs), attrs)
  }
}

function merge<R>(testData: R, attrs: Object): R {
  return _merge({}, testData, attrs)
}
