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
        let firstMatch;
        let matchCount = 0;
        for (const value of sortedValues) {
            const parts = value.split(/\s+/);
            const pattern = parts
                .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                .join("\\s*");
            const regex = new RegExp(pattern, "gi");
            const matches = [...input.matchAll(regex)];
            if (matches.length > 0) {
                matchCount += matches.length;
                const first = matches[0];
                if (first.index !== undefined &&
                    (!firstMatch ||
                        first.index < firstMatch.index)) {
                    firstMatch = {
                        value,
                        index: first.index,
                        length: first[0].length
                    };
                }
            }
        }
        if (!firstMatch) {
            return {
                remaining: input
            };
        }
        const remaining = input.substring(0, firstMatch.index) +
            " " +
            input.substring(firstMatch.index + firstMatch.length);
        return {
            value: firstMatch.value,
            remaining,
            duplicate: matchCount > 1
        };
    }
}
exports.KnownValueParser = KnownValueParser;
