"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureFactory = void 0;
class FixtureFactory {
    generator;
    mutator;
    constructor(generator, mutator = merge) {
        this.generator = generator;
        this.mutator = mutator;
    }
    create(input = undefined) {
        return this.mutator(this.generator(input), input);
    }
    createList(count, inputs = []) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(this.create(inputs[i]));
        }
        return result;
    }
}
exports.FixtureFactory = FixtureFactory;
function merge(original, overrides) {
    if (overrides === undefined) {
        return original;
    }
    if (typeof original === 'object' && typeof overrides === 'object') {
        // TODO: fix types
        return mergeObject(original, overrides);
    }
    else if (typeof original === typeof overrides) {
        return overrides;
    }
    else {
        return original;
    }
}
function mergeObject(obj1, obj2) {
    const filteredObj2 = filteredObject(obj2, Object.keys(obj1));
    return Object.assign(obj1, filteredObj2);
}
function filteredObject(obj, keys) {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
}
//# sourceMappingURL=index.js.map