import readline from "readline";
import { AddressParser } from "./parsers/AddressParser";

const parser = new AddressParser();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askAddress(): void {
    console.log();
    console.log("Enter an address.");
    console.log("Type 'exit' to quit.");
    console.log();

    rl.question("Address: ", (input: string) => {

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

        } catch (error) {

            if (error instanceof Error) {
                console.error(`\nError: ${error.message}`);
            } else {
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