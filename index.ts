import { merge as _merge } from 'lodash-es'

export function builderFactory<R>(generator: (attrs: any) => R) {
  return (attrs: any = {}) => {
    return merge(generator(attrs), attrs)
  }
}

function merge<R>(testData: R, attrs: Object): R {
  return _merge({}, testData, attrs)
}
