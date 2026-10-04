import { STATES } from "../data/states";
import { IComponentParser, ParseResult } from "./IComponentParser";
import { KnownValueParser } from "./KnownValueParser";

export class StateParser implements IComponentParser {

  readonly component = "state";

  private readonly parser: KnownValueParser;

  constructor() {
      this.parser = new KnownValueParser(STATES);
  }

  parse(input: string): ParseResult {
      return this.parser.parse(input);
  }
}