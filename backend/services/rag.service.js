// import { docs } from "../data/docs.js";

// export function findRelevantDocs(question) {
//   const stopWords = ["what", "is", "the", "a", "an", "of", "to"];

//   const words = question
//     .toLowerCase()
//     .split(" ")
//     .filter(word => word.trim() !== "" && !stopWords.includes(word));

//   const matches = docs.filter(doc =>
//     words.some(w => doc.toLowerCase().includes(w))
//   );

//   return matches.join("\n");
// }