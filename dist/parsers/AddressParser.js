"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressParser = void 0;
const normalize_1 = require("../utils/normalize");
const AptParser_1 = require("./AptParser");
const PostcodeParser_1 = require("./PostcodeParser");
const CityParser_1 = require("./CityParser");
const StateParser_1 = require("./StateParser");
const StreetParser_1 = require("./StreetParser");
class AddressParser {
    parsers = [
        new AptParser_1.AptParser(),
        new StreetParser_1.StreetParser(),
        new PostcodeParser_1.PostcodeParser(),
        new CityParser_1.CityParser(),
        new StateParser_1.StateParser()
    ];
    parse(input) {
        if (!input || input.trim().length === 0) {
            throw new Error("Address cannot be empty.");
        }
        let remaining = (0, normalize_1.normalizeInput)(input);
        const parsed = {};
        for (const parser of this.parsers) {
            const parseResult = parser.parse(remaining);
            if (parseResult.duplicate) {
                throw new Error(`Duplicate component detected: ${parser.component}.`);
            }
            if (parseResult.value) {
                if (parsed[parser.component]) {
                    throw new Error(`Duplicate component detected: ${parser.component}.`);
                }
                parsed[parser.component] =
                    (0, normalize_1.cleanOutput)(parseResult.value);
                remaining = parseResult.remaining;
            }
        }
        const section = (0, normalize_1.cleanOutput)(remaining);
        if (section) {
            parsed.section = section;
        }
        const result = {};
        if (parsed.apt) {
            result.apt = parsed.apt;
        }
        if (parsed.street) {
            result.street = parsed.street;
        }
        if (parsed.section) {
            result.section = parsed.section;
        }
        if (parsed.postcode) {
            result.postcode = parsed.postcode;
        }
        if (parsed.city) {
            result.city = parsed.city;
        }
        if (parsed.state) {
            result.state = parsed.state;
        }
        return result;
    }
}
exports.AddressParser = AddressParser;
