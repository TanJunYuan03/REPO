"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownValueParser = void 0;
class KnownValueParser {
    values;
    constructor(values) {
        this.values = values;
    }
    parse(input) {
        const sortedValues = [...this.values].sort((a, b) => b.length - a.length);
        for (const value of sortedValues) {
            const parts = value.split(/\s+/);
            const pattern = parts
                .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                .join("\\s*");
            const regex = new RegExp(pattern, "i");
            const match = input.match(regex);
            if (match) {
                return {
                    value: value,
                    remaining: input.substring(0, match.index) +
                        " " +
                        input.substring((match.index ?? 0) + match[0].length)
                };
            }
        }
        return {
            remaining: input
        };
    }
}
exports.KnownValueParser = KnownValueParser;
