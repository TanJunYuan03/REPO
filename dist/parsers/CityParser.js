"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityParser = void 0;
const cities_1 = require("../data/cities");
const KnownValueParser_1 = require("./KnownValueParser");
class CityParser {
    component = "city";
    parser;
    constructor() {
        this.parser = new KnownValueParser_1.KnownValueParser(cities_1.CITIES);
    }
    parse(input) {
        return this.parser.parse(input);
    }
}
exports.CityParser = CityParser;
