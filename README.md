# @reflow-work/test-fixture-factory

Create test fixtures easily!

This library is inspired by [Ecto Test factories](https://hexdocs.pm/ecto/test-factories.html).

## Install

```
npm install --save-dev @reflow-work/test-fixture-factory
```

## Usage

```typescript
import { FixtureFactory } from '@reflow-work/test-fixture-factory';

type UserType = {
  name: string;
  age: number;
};

const userFactory = new FixtureFactory<UserType>(() => {
  return { name: 'name', age: 30 };
});

// creating a user
const user0 = userFactory.create();

// { name: 'name', age: 30 }

// creating a user with overriding attributes
const user1 = userFactory.create({ name: 'new name' });

// { name: 'new name', age: 30 }

// creating users
const [user2, user3] = userFactory.createList(2);

// [{ name: 'name', age: 30 }, { name: 'name', age: 30 }]

// creating users with overriding attributes
const [user4, user5] = userFactory.createList(2, [
  { name: 'new name' },
  { age: 40 },
]);

// [{ name: 'new name', age: 30 }, { name: 'name', age: 40 }]
```

You can make more complicated fixture factory with custom attributes of generator.

```typescript
import { FixtureFactory } from '@reflow-work/test-fixture-factory';

const integerFactory = new FixtureFactory<
  number,
  { min: number | undefined; max: number | undefined }
>((attrs) => {
  const minNumber = attrs?.min ?? 0;
  const maxNumber = attrs?.max ?? Number.MAX_SAFE_INTEGER;

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
});

const number = integerFactory.create({ min: 0, max: 10 });
```

You can also composite those factories.

```typescript
import { FixtureFactory } from '@reflow-work/test-fixture-factory';

type UserType = {
  name: string;
  age: number;
};

const integerFactory = new FixtureFactory<
  number,
  { min: number | undefined; max: number | undefined }
>((attrs) => {
  const minNumber = attrs?.min ?? 0;
  const maxNumber = attrs?.max ?? Number.MAX_SAFE_INTEGER;

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
});

const userFactory = new FixtureFactory<UserType>(() => {
  return {
    name: 'name',
    age: integerFactory.create({ min: 0, max: 100 }),
  };
});
```

When creating a `FixtureFactory` using a class, you should use `| undefined = undefined` to the fields instead of `?`(optional). This is because the generator is set to return `Required<T>`. This prevents merging non-existent keys when overriding `attrs`.

See also [When to use typescript optional property? How is it different from declaring property as undefined](https://kate-dev.medium.com/when-to-use-typescript-optional-property-how-is-it-different-from-declaring-property-as-undefined-2319a0ee1f07)

```typescript
class UserClass {
  constructor(
    public name: string,
    public age: number | undefined = undefined // instead of `number?`
  );
}

const userFactory = new FixtureFactory<UserClass>(() => ...)
```

For more information, see also [test codes](./src/index.test.ts)

## Contributing

To install dependencies:

```bash
bun install
```

To run test:

```bash
bun test src
```

This project was created using `bun init` in bun v1.0.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
