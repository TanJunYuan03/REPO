import { IComponentParser, ParseResult } from "./IComponentParser";

export class PostcodeParser implements IComponentParser {

  readonly component = "postcode";

  parse(input: string): ParseResult {

    const regex = /(?<!\d)\d{5}(?!\d)/;

    const match = input.match(regex);

    if (!match) {
      return {
        remaining: input
      };
    }

    const postcode = Number(match[0]);

    if (postcode < 1000 || postcode > 98859) {
      return {
        remaining: input
      };
    }

    return {
      value: match[0],
      remaining:
        input.substring(0, match.index) +
        " " +
        input.substring(
            (match.index ?? 0) + match[0].length
        )
    };
  }
}