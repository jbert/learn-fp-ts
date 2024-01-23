#!/usr/bin/env ts-node

const numOrErr = (): number => {
    const n = Math.random();
    if (n < 0.7) {
        return n;
    } else {
        throw Error(`Urgh. High number: ${n}`);
    }
};

const printDigest = (ns: Array<number>) => {
    let sum = 0;
    for (var n of ns) {
        sum += n;
    }
    const count = ns.length;
    const mean = sum / count;
    console.log(`Count ${count} Sum ${sum} Mean ${mean}`);
};

const main = () => {
    var es = new Array<number>();
    for (let i = 0; i < 5; i++) {
        try {
            es.push(numOrErr());
        } catch (error) {
            console.error(error);
        }
    }
    printDigest(es);
};

main();
