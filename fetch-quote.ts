#!/usr/bin/env ts-node
import axios from "axios";
import { AxiosResponse } from "axios";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

const responseToString = (r: AxiosResponse<any, any>): string => {
    return r.data;
};

const fetchPage = (u: string): TE.TaskEither<Error, string> => {
    const p = axios.get(u);
    return pipe(
        TE.tryCatchK(
            () => p,
            (reason: unknown) => Error(String(reason))
        )(),
        TE.map(responseToString)
    );
};

const printPage = (s: string) => {
    console.log(s);
};

const main = async () => {
    const u = "https://zenquotes.io/api/quotes";
    pipe(u, fetchPage, TE.map(printPage))();
};

main();
