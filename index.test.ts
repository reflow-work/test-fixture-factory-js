import { describe, test, expect } from 'bun:test'
import { FixtureFactory } from './index'

type User = {
  id: number | null
  name: string
  age: number
}

describe('FixtureFactory', () => {
  test('generate test data with generator', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = userFactory.create()

    expect(user).toEqual({
      id: null,
      name: "name",
      age: 30,
    })
  })

  test('generate test data with generator dynamically', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: Math.random(),
      }
    })

    const user0 = userFactory.create()
    const user1 = userFactory.create()

    expect(user0.age).not.toEqual(user1.age)
    expect(user0.age).toBeGreaterThanOrEqual(0)
    expect(user0.age).toBeLessThanOrEqual(1)
  })

  test('merge generated test data with given attrs', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = userFactory.create({ name: "new name" })

    expect(user).toEqual({
      id: null,
      name: "new name",
      age: 30,
    })
  })

  test('generate test data with attrs', () => {
    const userFactory = new FixtureFactory<User>((attrs) => {
      const [type, _] = pop(attrs, "type")

      const age = type === "child" ? 10 : 30

      return {
        id: null,
        name: "name",
        age: age,
      }
    })

    const user = userFactory.create({ type: "child" })

    expect(user).toEqual({
      id: null,
      name: "name",
      age: 10,
    })
  })

  test('fields of attrs which is not in the type should be ignored', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = userFactory.create({ invalid_field: "invalid" })

    expect(user).toEqual({
      id: null,
      name: "name",
      age: 30,
    })
  })
})

function pop(obj: any, key: string) {
  const value = obj[key];

  delete obj[key];

  return [value, obj];
}
