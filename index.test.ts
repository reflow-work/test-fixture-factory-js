import { describe, test, expect } from 'bun:test'
import { builderFactory } from './index'

type User = {
  id: number | null;
  name: string;
  age: number;
}

describe('builderFactory/1', () => {
  test('generate test data with generator', () => {
    const buildUser = builderFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = buildUser()

    expect(user).toEqual({
      id: null,
      name: "name",
      age: 30,
    })
  })

  test('generate test data with generator dynamically', () => {
    const buildUser = builderFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: Math.random(),
      }
    })

    const user0 = buildUser()
    const user1 = buildUser()

    expect(user0.age).not.toEqual(user1.age)
    expect(user0.age).toBeGreaterThanOrEqual(0)
    expect(user0.age).toBeLessThanOrEqual(1)
  })

  test('merge generated test data with given attrs', () => {
    const buildUser = builderFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = buildUser({ name: "new name" })

    expect(user).toEqual({
      id: null,
      name: "new name",
      age: 30,
    })
  })

  test('generate test data with attrs', () => {
    const buildUser = builderFactory<User>((attrs) => {
      const [type, _] = pop(attrs, "type")

      const age = type === "child" ? 10 : 30

      return {
        id: null,
        name: "name",
        age: age,
      }
    })

    const user = buildUser({ type: "child" })

    expect(user).toEqual({
      id: null,
      name: "name",
      age: 10,
    })
  })

  test('fields of attrs which is not in the type should be ignored', () => {
    const buildUser = builderFactory<User>(() => {
      return {
        id: null,
        name: "name",
        age: 30,
      }
    })

    const user = buildUser({ invalid_field: "invalid" })

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
