#!/usr/bin/env ts-node
import { pipe } from "fp-ts/function";

const addOne = (n: number): number => {
    return n + 1;
};

const timesTwo = (n: number): number => {
    return n * 2;
};

const main = () => {
    const n = 5;
    const result = pipe(n, addOne, timesTwo);
    console.log(result);
};

main();
