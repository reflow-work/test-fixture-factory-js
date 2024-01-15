"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bun_test_1 = require("bun:test");
const index_1 = require("./index");
class UserClass {
    id;
    name;
    age;
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    get isAdult() {
        return this.age >= 20;
    }
}
(0, bun_test_1.describe)('FixtureFactory.create/1', () => {
    (0, bun_test_1.test)('generate test object data with generator', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: 30,
            };
        });
        const user = userFactory.create();
        (0, bun_test_1.expect)(user).toEqual({
            id: null,
            name: 'name',
            age: 30,
        });
    });
    (0, bun_test_1.test)('generate test number data with generator', () => {
        const numberFactory = new index_1.FixtureFactory(() => {
            return 1;
        });
        const number = numberFactory.create();
        (0, bun_test_1.expect)(number).toEqual(1);
    });
    (0, bun_test_1.test)('generate test data with generator dynamically', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: Math.random(),
            };
        });
        const user0 = userFactory.create();
        const user1 = userFactory.create();
        (0, bun_test_1.expect)(user0.age).not.toEqual(user1.age);
        (0, bun_test_1.expect)(user0.age).toBeGreaterThanOrEqual(0);
        (0, bun_test_1.expect)(user0.age).toBeLessThanOrEqual(1);
    });
    (0, bun_test_1.test)('merge generated test object with given attrs', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: 30,
            };
        });
        const user = userFactory.create({ name: 'new name' });
        (0, bun_test_1.expect)(user).toEqual({
            id: null,
            name: 'new name',
            age: 30,
        });
    });
    (0, bun_test_1.test)('merge generated test instance with given attrs', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return new UserClass(null, 'name', 30);
        });
        const user = userFactory.create({ name: 'new name' });
        (0, bun_test_1.expect)(user.id).toEqual(null);
        (0, bun_test_1.expect)(user.name).toEqual('new name');
        (0, bun_test_1.expect)(user.age).toEqual(30);
        (0, bun_test_1.expect)(user.isAdult).toEqual(true);
    });
    (0, bun_test_1.test)('generate test data with custom attrs', () => {
        const userFactory = new index_1.FixtureFactory((attrs) => {
            const age = attrs?.type === 'child' ? 10 : 30;
            return {
                id: null,
                name: 'name',
                age: age,
            };
        });
        const user = userFactory.create({ type: 'child', name: 'new name' });
        (0, bun_test_1.expect)(user).toEqual({
            id: null,
            name: 'new name',
            age: 10,
        });
    });
    (0, bun_test_1.test)('generate test data with custom generator', () => {
        const integerFactory = new index_1.FixtureFactory((attrs) => {
            const minNumber = attrs?.min ?? 0;
            const maxNumber = attrs?.max ?? Number.MAX_SAFE_INTEGER;
            return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
        });
        const number = integerFactory.create({ min: 0, max: 10 });
        (0, bun_test_1.expect)(number).toBeGreaterThanOrEqual(0);
        (0, bun_test_1.expect)(number).toBeLessThanOrEqual(10);
    });
    (0, bun_test_1.test)('fields of attrs which is not in the type should be ignored', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: 30,
            };
        });
        const user = userFactory.create({ invalid_field: 'invalid' });
        (0, bun_test_1.expect)(user).toEqual({
            id: null,
            name: 'name',
            age: 30,
        });
    });
});
(0, bun_test_1.describe)('FixtureFactory.createList/2', () => {
    (0, bun_test_1.test)('generate test object data list with generator', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: 30,
            };
        });
        const users = userFactory.createList(2);
        (0, bun_test_1.expect)(users).toEqual([
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
    (0, bun_test_1.test)('merge generated test data list with given attrs', () => {
        const userFactory = new index_1.FixtureFactory(() => {
            return {
                id: null,
                name: 'name',
                age: 30,
            };
        });
        const users = userFactory.createList(2, [{ name: 'new name' }]);
        (0, bun_test_1.expect)(users).toEqual([
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
//# sourceMappingURL=index.test.js.map