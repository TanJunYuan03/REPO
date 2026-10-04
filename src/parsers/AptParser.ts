import { IComponentParser, ParseResult } from "./IComponentParser";

export class AptParser implements IComponentParser {

  readonly component = "apt";

  parse(input: string): ParseResult {

    const regex = /No\s*\d+/gi;

    const matches = [...input.matchAll(regex)];

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

    const number = match[0].match(/\d+/)?.[0];

    if (!number || match.index === undefined) {
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
          match.index + match[0].length
        )
    };
  }
}