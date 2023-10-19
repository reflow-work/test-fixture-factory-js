import { merge as _merge } from 'lodash-es'

export default class TestFixtureFactory<T> {
  constructor(private generator: (attrs: any) => T) {}

  create(attrs: any = {}): T {
    return this.merge(this.generator(attrs), attrs)
  }

  private merge(testData: T, attrs: Object): T {
    return _merge({}, testData, attrs)
  }
}
