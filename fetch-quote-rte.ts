#!/usr/bin/env ts-node
import axios from "axios";
import { AxiosResponse } from "axios";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as J from "fp-ts/Json";
import { pipe } from "fp-ts/function";

interface Quote {
    q: string;
    a: string;
    c: string;
    h: string;
}

const responseToString = (r: AxiosResponse<any, any>): string => {
    return r.data;
};

const firstElt = (j: J.Json): J.Json => {
    if (j == undefined) {
        throw "ack";
    }
    if (j instanceof J.JsonArray) {
        if (j.length == 0) {
            throw "ack";
        }
        return j[0];
    } else {
        throw "ack";
    }
};

const extractQuotes = (js: string): E.Either<unknown, string> => {
    return pipe(js, J.parse, firstElt, J.stringify);
};

interface Params {
    quoteURL: string;
}

const fetchPage = (quoteURL: string): TE.TaskEither<Error, string> => {
    const p = axios.get(quoteURL);
    return pipe(
        TE.tryCatchK(
            () => p,
            (reason: unknown) => Error(String(reason))
        )(),
        TE.map(responseToString)
    );
};

const program = ({ quoteURL }: Params): TE.TaskEither<Error, string> => {
    return pipe(quoteURL, fetchPage);
};

const main = async () => {
    const params: Params = {
        quoteURL: "https://zenquotes.io/api/quotes",
    };
    return pipe(program(params), (t) =>
        t().then(E.fold(console.error, console.log))
    );
};

main();
