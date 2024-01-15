type Undefinedable<T> = T | undefined;
type Input<T, R> = Undefinedable<T extends {
    [key: string]: unknown;
} ? Partial<T> & R : R>;
export declare class FixtureFactory<T extends NonNullable<any>, R = unknown> {
    private generator;
    private mutator;
    constructor(generator: (input: Input<T, R>) => Required<T>, mutator?: (original: T, input: Input<T, R>) => T);
    create(input?: Input<T, R>): T;
    createList(count: number, inputs?: Input<T, R>[]): T[];
}
export {};
