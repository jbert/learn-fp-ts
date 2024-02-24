#!/usr/bin/env ts-node
import axios from "axios";
import { AxiosResponse } from "axios";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import * as D from "io-ts/Decoder";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/function";

const Quote = D.struct({
    q: D.string,
    a: D.string,
    c: D.string,
    h: D.string,
});
const QuoteArray = D.array(Quote);
type Quote = D.TypeOf<typeof Quote>;

const mapErr = (de: D.DecodeError): Error => {
    return Error(JSON.stringify(de));
};

const parseResponse = (
    r: AxiosResponse<unknown, unknown>
): E.Either<Error, Array<Quote>> =>
    pipe(r.data, QuoteArray.decode, E.mapLeft(mapErr));

const quoteToString = (q: Quote): string => {
    return q.q;
};

interface Params {
    quoteURL: string;
}

const fetchPage = (quoteURL: string): TE.TaskEither<Error, Array<Quote>> =>
    pipe(
        TE.tryCatchK(
            () => axios.get(quoteURL),
            (reason: unknown) => Error(String(reason))
        )(),
        TE.chain(flow(parseResponse, TE.fromEither))
    );

const program = ({ quoteURL }: Params): TE.TaskEither<Error, string> =>
    pipe(
        quoteURL,
        fetchPage,
        TE.map(
            flow(
                A.map(quoteToString),
                A.head,
                O.getOrElse(() => "No quotes!")
            )
        )
    );

const main = async () => {
    const params: Params = {
        quoteURL: "https://zenquotes.io/api/quotes",
    };
    return pipe(program(params), (t) =>
        t().then(E.fold(console.error, console.log))
    );
};

main();
