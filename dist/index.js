"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const AddressParser_1 = require("./parsers/AddressParser");
const parser = new AddressParser_1.AddressParser();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askAddress() {
    console.log();
    console.log("Enter an address.");
    console.log("Type 'exit' to quit.");
    console.log();
    rl.question("Address: ", (input) => {
        // Exit
        if (input.trim().toLowerCase() === "exit") {
            console.log("\nGoodbye!");
            rl.close();
            return;
        }
        try {
            const result = parser.parse(input);
            console.log("\nResult:");
            console.log(JSON.stringify(result, null, 2));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`\nError: ${error.message}`);
            }
            else {
                console.error("\nAn unexpected error occurred.");
            }
        }
        // Ask for another address
        askAddress();
    });
}
console.log("=================================");
console.log("       Address Tokenizer");
console.log("=================================");
askAddress();
