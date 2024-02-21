#!/usr/bin/env ts-node
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

const program = (): TE.TaskEither<string, string> => {
    return pipe(
        O.none,
        TE.fromOption(() => "No quote")
    );
};

const main = async () => {
    return pipe(program(), (t) => t().then(E.fold(console.error, console.log)));
};

main();
