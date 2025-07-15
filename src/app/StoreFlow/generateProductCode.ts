import crypto from "crypto";

function generateProductCode(productName: string): string {
  
  const findLongestIncreasingSubstring = (str: string): string[] => {
    let substrings: string[] = [];
    let currentSubstring = str[0];

    for (let i = 1; i < str.length; i++) {
      if (str[i] > str[i - 1]) {
        currentSubstring += str[i];
      } else {
        if (currentSubstring.length > 1) substrings.push(currentSubstring);
        currentSubstring = str[i];
      }
    }

    if (currentSubstring.length > 1) substrings.push(currentSubstring);
    return substrings;
  };


  const hashProductName = (name: string): string => {
    return crypto.createHash("sha256").update(name).digest("hex").slice(0, 6); // First 6 charc 
  };

  const substrings = findLongestIncreasingSubstring(productName.toLowerCase());
  const longestSubstrings = substrings.join("");
  const startIndex = productName.toLowerCase().indexOf(longestSubstrings);
  const endIndex = startIndex + longestSubstrings.length - 1;


  const hashedName = hashProductName(productName);
  const productCode = `${hashedName}-${startIndex}${longestSubstrings}${endIndex}`;

  return productCode;
}

export { generateProductCode };
