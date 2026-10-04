import { IComponentParser, ParseResult } from "./IComponentParser";

export class PostcodeParser implements IComponentParser {

  readonly component = "postcode";

  parse(input: string): ParseResult {

    const regex = /(?<!\d)\d{5}(?!\d)/g;

    const matches = [...input.matchAll(regex)]
      .filter(match => {
          const postcode = Number(match[0]);

          return postcode >= 1000 && postcode <= 98859;
      });

    if (matches.length === 0) {
      return {
        remaining: input
      };
    }

    if (matches.length > 1) {
      return {
        remaining: input,
        duplicate: true
      };
    }

    const match = matches[0];

    if (match.index === undefined) {
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
          match.index + match[0].length
        )
    };
  }
}