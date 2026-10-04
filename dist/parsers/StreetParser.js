"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreetParser = void 0;
class StreetParser {
    component = "street";
    parse(input) {
        const regex = /\b(Jalan|Jln|Lorong|Persiaran)\b/i;
        const match = input.match(regex);
        if (!match) {
            return {
                remaining: input
            };
        }
        const startIndex = match.index ?? 0;
        const beforeStreet = input
            .substring(0, startIndex)
            .trim();
        const afterStreetStart = input
            .substring(startIndex)
            .trim();
        const commaIndex = afterStreetStart.indexOf(",");
        if (commaIndex !== -1) {
            const street = afterStreetStart
                .substring(0, commaIndex)
                .trim();
            const afterStreet = afterStreetStart
                .substring(commaIndex + 1)
                .trim();
            return {
                value: street,
                remaining: `${beforeStreet} ${afterStreet}`.trim()
            };
        }
        const postcodeMatch = afterStreetStart.match(/(?<!\d)\d{5}(?!\d)/);
        if (postcodeMatch && postcodeMatch.index !== undefined) {
            const beforePostcode = afterStreetStart
                .substring(0, postcodeMatch.index)
                .trim();
            const afterPostcode = afterStreetStart
                .substring(postcodeMatch.index)
                .trim();
            const numberMatch = beforePostcode.match(/\d+(?:[A-Za-z]|\/\d+|-\d+)?/);
            if (numberMatch && numberMatch.index !== undefined) {
                const streetEnd = numberMatch.index + numberMatch[0].length;
                const street = beforePostcode
                    .substring(0, streetEnd)
                    .trim();
                const sectionAfterStreet = beforePostcode
                    .substring(streetEnd)
                    .trim();
                return {
                    value: street,
                    remaining: `${beforeStreet} ${sectionAfterStreet} ${afterPostcode}`
                        .trim()
                };
            }
            return {
                value: beforePostcode,
                remaining: `${beforeStreet} ${afterPostcode}`.trim()
            };
        }
        return {
            value: afterStreetStart,
            remaining: beforeStreet
        };
    }
}
exports.StreetParser = StreetParser;
