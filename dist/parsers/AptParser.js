"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptParser = void 0;
class AptParser {
    component = "apt";
    parse(input) {
        const regex = /No\s*\d+/i;
        const match = input.match(regex);
        if (!match) {
            return {
                remaining: input
            };
        }
        const number = match[0].match(/\d+/)?.[0];
        if (!number) {
            return {
                remaining: input
            };
        }
        return {
            value: `No ${number}`,
            remaining: input.substring(0, match.index) +
                " " +
                input.substring((match.index ?? 0) + match[0].length)
        };
    }
}
exports.AptParser = AptParser;
