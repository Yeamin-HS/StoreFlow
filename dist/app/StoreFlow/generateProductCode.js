"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductCode = generateProductCode;
const crypto_1 = __importDefault(require("crypto"));
function generateProductCode(productName) {
    const findLongestIncreasingSubstring = (str) => {
        let substrings = [];
        let currentSubstring = str[0];
        for (let i = 1; i < str.length; i++) {
            if (str[i] > str[i - 1]) {
                currentSubstring += str[i];
            }
            else {
                if (currentSubstring.length > 1)
                    substrings.push(currentSubstring);
                currentSubstring = str[i];
            }
        }
        if (currentSubstring.length > 1)
            substrings.push(currentSubstring);
        return substrings;
    };
    const hashProductName = (name) => {
        return crypto_1.default.createHash("sha256").update(name).digest("hex").slice(0, 6); // First 6 charc 
    };
    const substrings = findLongestIncreasingSubstring(productName.toLowerCase());
    const longestSubstrings = substrings.join("");
    const startIndex = productName.toLowerCase().indexOf(longestSubstrings);
    const endIndex = startIndex + longestSubstrings.length - 1;
    const hashedName = hashProductName(productName);
    const productCode = `${hashedName}-${startIndex}${longestSubstrings}${endIndex}`;
    return productCode;
}
