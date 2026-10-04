import { Address } from "../models/Address";
import { normalizeInput, cleanOutput } from "../utils/normalize";

import { AptParser } from "./AptParser";
import { PostcodeParser } from "./PostcodeParser";
import { CityParser } from "./CityParser";
import { StateParser } from "./StateParser";
import { StreetParser } from "./StreetParser";
import { IComponentParser } from "./IComponentParser";

export class AddressParser {

  private readonly parsers: IComponentParser[] = [
    new AptParser(),
    new StreetParser(),
    new PostcodeParser(),
    new CityParser(),
    new StateParser()
  ];

  parse(input: string): Address {

    if (!input || input.trim().length === 0) {
        throw new Error("Address cannot be empty.");
    }

    let remaining = normalizeInput(input);

    const parsed: Address = {};

    for (const parser of this.parsers) {

      const parseResult = parser.parse(remaining);

      if (parseResult.duplicate) {
        throw new Error(
          `Duplicate component detected: ${parser.component}.`
        );
      }

      if (parseResult.value) {

        if (parsed[parser.component]) {
          throw new Error(
            `Duplicate component detected: ${parser.component}.`
          );
        }

        parsed[parser.component] =
            cleanOutput(parseResult.value);

        remaining = parseResult.remaining;
      }
    }

    const section = cleanOutput(remaining);

    if (section) {
        parsed.section = section;
    }

    const result: Address = {};

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