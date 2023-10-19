import { describe, test, expect } from 'bun:test'
import TestFixtureFactory from './index'

type User = {
  id: number | null
  name: string
  age: number
}

describe('TestFixtureFactory', () => {
  describe('create function', () => {
    test('generates test data with generator', () => {
      const userFixture = new TestFixtureFactory<User>(() => {
        return {
          id: null,
          name: 'name',
          age: 30,
        }
      })

      const user = userFixture.create()

      expect(user).toEqual({
        id: null,
        name: 'name',
        age: 30,
      })
    })

    test('generates test data with generator dynamically', () => {
      const userFixture = new TestFixtureFactory<User>(() => {
        return {
          id: null,
          name: 'name',
          age: Math.random(),
        }
      })

      const user0 = userFixture.create()
      const user1 = userFixture.create()

      expect(user0.age).not.toEqual(user1.age)
      expect(user0.age).toBeGreaterThanOrEqual(0)
      expect(user0.age).toBeLessThanOrEqual(1)
    })

    test('merges generated test data with given attrs', () => {
      const userFixture = new TestFixtureFactory<User>(() => {
        return {
          id: null,
          name: 'name',
          age: 30,
        }
      })

      const user = userFixture.create({ name: 'new name' })

      expect(user).toEqual({
        id: null,
        name: 'new name',
        age: 30,
      })
    })

    test('generates test data with attrs', () => {
      const userFixture = new TestFixtureFactory<User>((attrs) => {
        const [type, _] = pop(attrs, 'type')

        const age = type === 'child' ? 10 : 30

        return {
          id: null,
          name: 'name',
          age: age,
        }
      })

      const user = userFixture.create({ type: 'child' })

      expect(user).toEqual({
        id: null,
        name: 'name',
        age: 10,
      })
    })
  })
})

function pop(obj: any, key: string) {
  const value = obj[key]

  delete obj[key]

  return [value, obj]
}
