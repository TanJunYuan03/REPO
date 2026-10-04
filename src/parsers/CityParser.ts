import { CITIES } from "../data/cities";
import { IComponentParser, ParseResult } from "./IComponentParser";
import { KnownValueParser } from "./KnownValueParser";

export class CityParser implements IComponentParser {

  readonly component = "city";

  private readonly parser: KnownValueParser;

  constructor() {
      this.parser = new KnownValueParser(CITIES);
  }

  parse(input: string): ParseResult {
      return this.parser.parse(input);
  }
}