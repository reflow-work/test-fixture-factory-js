import { describe, test, expect } from 'bun:test'
import { builderFactory } from './index'

type User = {
  id: number | null;
  name: string;
  age: number;
}

describe('builderFactory/1', () => {
  test('with static value generator', () => {
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
})
