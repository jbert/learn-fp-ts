#!/usr/bin/env ts-node
import * as E from "fp-ts/Either";

const numOrErr = (): E.Either<string, number> => {
    const n = Math.random();
    if (n < 0.7) {
        return E.right(n);
    } else {
        return E.left(`Urgh. High number: ${n}`);
    }
};

const printDigest = (ns: Array<E.Either<string, number>>) => {

    const nums = ns.map(E.getOrElse(() => 0));
    const count = ns.filter(E.isRight).length;

    const plus = (a: number, b:number) => a+b;
    const sum = nums.reduce(plus, 0);

    // What is the better way to avoid two scans over the `ns`?
    const mean = sum / count;

    console.log(`Count ${count} Sum ${sum} Mean ${mean}`);
};

const main = () => {
    var es = new Array<E.Either<string, number>>();
    for (let i = 0; i < 5; i++) {
        es.push(numOrErr());
    }
    printDigest(es);
};

main();
