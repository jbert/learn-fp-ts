#!/usr/bin/env ts-node

interface Quote {
    q: string;
}

const a = { p: "foo" } as Quote;
console.log(a);
