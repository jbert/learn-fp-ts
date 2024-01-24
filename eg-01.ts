#!/usr/bin/env ts-node
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";

const numOrErr = (): E.Either<string, number> => {
    const n = Math.random();
    if (n < 0.7) {
        return E.right(n);
    } else {
        return E.left(`Urgh. High number: ${n}`);
    }
};

interface Stats {
    count: number;
    mean: number;
    sum: number;
}

const toStats = (ns: Array<E.Either<string, number>>): Stats => {

    const nums = ns.map(E.getOrElse(() => 0));
    const count = ns.filter(E.isRight).length;

    const plus = (a: number, b:number) => a+b;
    const sum = nums.reduce(plus, 0);

    // What is the better way to avoid two scans over the `ns`?
    const mean = sum / count;

    return {
        count: count,
        mean: mean,
        sum: sum
    }
};

const statsToString = (s: Stats) => {
    return `count ${s.count} mean ${s.mean} sum ${s.sum}`;
}

const main = () => {
    var es = new Array<E.Either<string, number>>();
    for (let i = 0; i < 5; i++) {
        es.push(numOrErr());
    }
    const [errs, stats] = pipe(es, A.partition(E.isRight), ({left, right}) => [left, toStats(right)]);
    console.log(statsToString(stats));
    console.log(`Had ${errs.length} errors`);
};

main();
