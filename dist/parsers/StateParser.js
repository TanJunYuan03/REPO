"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateParser = void 0;
const states_1 = require("../data/states");
const KnownValueParser_1 = require("./KnownValueParser");
class StateParser {
    component = "state";
    parser;
    constructor() {
        this.parser = new KnownValueParser_1.KnownValueParser(states_1.STATES);
    }
    parse(input) {
        return this.parser.parse(input);
    }
}
exports.StateParser = StateParser;
