import { describe, test, expect } from 'bun:test';
import { FixtureFactory } from './index';

type UserType = {
  id: number | null;
  name: string;
  age: number;
};

class UserClass {
  constructor(
    public id: number | null,
    public name: string,
    public age: number
  ) {}

  get isAdult() {
    return this.age >= 20;
  }
}

describe('FixtureFactory.create/1', () => {
  test('generate test object data with generator', () => {
    const userFactory = new FixtureFactory<UserType>(() => {
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
    const userFactory = new FixtureFactory<UserType>(() => {
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

  test('merge generated test object with given attrs', () => {
    const userFactory = new FixtureFactory<UserType>(() => {
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

  test('merge generated test instance with given attrs', () => {
    const userFactory = new FixtureFactory<UserClass>(() => {
      return new UserClass(null, 'name', 30);
    });

    const user = userFactory.create({ name: 'new name' });

    expect(user.id).toEqual(null);
    expect(user.name).toEqual('new name');
    expect(user.age).toEqual(30);
    expect(user.isAdult).toEqual(true);
  });

  test('generate test data with custom attrs', () => {
    const userFactory = new FixtureFactory<UserType, { type: string }>(
      (attrs) => {
        const age = attrs?.type === 'child' ? 10 : 30;

        return {
          id: null,
          name: 'name',
          age: age,
        };
      }
    );

    const user = userFactory.create({ type: 'child', name: 'new name' });

    expect(user).toEqual({
      id: null,
      name: 'new name',
      age: 10,
    });
  });

  test('generate test data with custom generator', () => {
    const integerFactory = new FixtureFactory<
      number,
      { min: number | undefined; max: number | undefined }
    >((attrs) => {
      const minNumber = attrs?.min ?? 0;
      const maxNumber = attrs?.max ?? Number.MAX_SAFE_INTEGER;

      return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    });

    const number = integerFactory.create({ min: 0, max: 10 });

    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(10);
  });

  test('fields of attrs which is not in the type should be ignored', () => {
    const userFactory = new FixtureFactory<UserType, { invalid_field: string }>(
      () => {
        return {
          id: null,
          name: 'name',
          age: 30,
        };
      }
    );

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
    const userFactory = new FixtureFactory<UserType>(() => {
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
    const userFactory = new FixtureFactory<UserType>(() => {
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
