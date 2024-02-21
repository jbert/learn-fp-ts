#!/usr/bin/env ts-node
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";

const program = (): TE.TaskEither<string, number> => {
    const a: Array<number> = [1, 2, 3, 4];
    return pipe(
        a,
        A.head,
        TE.fromOption(() => "No quote")
    );
};

const main = async () => {
    return pipe(program(), (t) => t().then(E.fold(console.error, console.log)));
};

main();
