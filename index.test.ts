import { describe, test, expect } from 'bun:test';
import { FixtureFactory } from './index';

type User = {
  id: number | null;
  name: string;
  age: number;
};

describe('FixtureFactory.create/1', () => {
  test('generate test object data with generator', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: 30,
      };
    });

    const user = userFactory.create();

    expect(user).toEqual({
      id: null,
      name: 'name',
      age: 30,
    });
  });

  test('generate test number data with generator', () => {
    const numberFactory = new FixtureFactory<number>(() => {
      return 1;
    });

    const number = numberFactory.create();

    expect(number).toEqual(1);
  });

  test('generate test data with generator dynamically', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: Math.random(),
      };
    });

    const user0 = userFactory.create();
    const user1 = userFactory.create();

    expect(user0.age).not.toEqual(user1.age);
    expect(user0.age).toBeGreaterThanOrEqual(0);
    expect(user0.age).toBeLessThanOrEqual(1);
  });

  test('merge generated test data with given attrs', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: 30,
      };
    });

    const user = userFactory.create({ name: 'new name' });

    expect(user).toEqual({
      id: null,
      name: 'new name',
      age: 30,
    });
  });

  test('generate test data with attrs', () => {
    const userFactory = new FixtureFactory<User>((attrs) => {
      const [type, _] = pop(attrs, 'type');

      const age = type === 'child' ? 10 : 30;

      return {
        id: null,
        name: 'name',
        age: age,
      };
    });

    const user = userFactory.create({ type: 'child' });

    expect(user).toEqual({
      id: null,
      name: 'name',
      age: 10,
    });
  });

  test('generate test data with custom mutator', () => {
    const integerFactory = new FixtureFactory<number>(
      ({ min, max }: { min?: number; max?: number }) => {
        const minNumber = min ?? 0;
        const maxNumber = max ?? Number.MAX_SAFE_INTEGER;

        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
      }
    );

    const number = integerFactory.create({ min: 0, max: 10 });

    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(10);
  });

  test('fields of attrs which is not in the type should be ignored', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: 30,
      };
    });

    const user = userFactory.create({ invalid_field: 'invalid' });

    expect(user).toEqual({
      id: null,
      name: 'name',
      age: 30,
    });
  });
});

describe('FixtureFactory.createList/2', () => {
  test('generate test object data list with generator', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: 30,
      };
    });

    const users = userFactory.createList(2);

    expect(users).toEqual([
      {
        id: null,
        name: 'name',
        age: 30,
      },
      {
        id: null,
        name: 'name',
        age: 30,
      },
    ]);
  });

  test('merge generated test data list with given attrs', () => {
    const userFactory = new FixtureFactory<User>(() => {
      return {
        id: null,
        name: 'name',
        age: 30,
      };
    });

    const users = userFactory.createList(2, [{ name: 'new name' }]);

    expect(users).toEqual([
      {
        id: null,
        name: 'new name',
        age: 30,
      },
      {
        id: null,
        name: 'name',
        age: 30,
      },
    ]);
  });
});

function pop(obj: any, key: string) {
  const value = obj[key];

  delete obj[key];

  return [value, obj];
}
