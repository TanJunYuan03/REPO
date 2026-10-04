import { IComponentParser, ParseResult } from "./IComponentParser";

export class AptParser implements IComponentParser {

  readonly component = "apt";

  parse(input: string): ParseResult {

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
      remaining:
        input.substring(0, match.index) +
        " " +
        input.substring(
          (match.index ?? 0) + match[0].length
        )
    };
  }
}