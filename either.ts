#!/usr/bin/env ts-node
import * as E from "fp-ts/Either";

const strOrErr = (): E.Either<Error, string> => {
    const n = Math.random();
    if (n < 0.5) {
        return E.right(`Nice low number: ${n}`);
    } else {
        return E.left(Error(`Urgh. High number: ${n}`));
    }
};

const getWins = E.match(
    () => undefined,
    (right: string) => right
);

const main = () => {
    var es = new Array<E.Either<Error, string>>();
    es.push(strOrErr());
    es.push(strOrErr());
    es.push(strOrErr());

    const wins = es.map(getWins);
    // Ugh, list of num or undef
    console.log(`wins: ${wins}`);
};

main();
