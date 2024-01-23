#!/usr/bin/env ts-node
import axios from "axios";

function getQuotes() {
    const u = "https://zenquotes.io/api/quotes";
    axios
        .get(u)
        .then(function ({ data }) {
            console.log(data);
        })
        .catch(function (error: any) {
            console.error(error);
        });
}

getQuotes();
