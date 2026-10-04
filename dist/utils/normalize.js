"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInput = normalizeInput;
exports.cleanOutput = cleanOutput;
function normalizeInput(input) {
    return input
        .trim()
        .replace(/\s+/g, " ");
}
function cleanOutput(value) {
    const cleaned = value
        .replace(/[,.]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (!cleaned) {
        return "";
    }
    return cleaned
        .split(" ")
        .map(word => {
        if (/^\d/.test(word)) {
            return word;
        }
        return word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase();
    })
        .join(" ");
}
