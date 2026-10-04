import { Address } from "../models/Address";

export interface ParseResult {
  value?: string;
  remaining: string;
  duplicate?: boolean
}

export interface IComponentParser {
  readonly component: keyof Address;
  parse(input: string): ParseResult;
}