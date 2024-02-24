#!/usr/bin/env ts-node
import * as D from "io-ts/Decoder";

const Quote = D.struct({
    q: D.string,
    a: D.string,
});

console.log(Quote.decode({q: "foo", a: "bar"}));

console.log(Quote.decode({q: "foo", a: "bar", c: "foo"}));
console.log(Quote.decode({q: "foo" }));
