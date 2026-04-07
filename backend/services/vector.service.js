import { docs } from "../data/docs.js";
import { getSimilarityScores } from "./embedding.service.js";

export async function initVectors() {
  // No pre-computation needed — similarity is computed at query time
  console.log("✅ Vector service ready");
}

export async function findRelevantDocsVector(question) {
  // Get similarity scores between the question and all docs in one API call
  const scores = await getSimilarityScores(question, docs);

  const scored = docs.map((text, i) => ({ text, score: scores[i] }));
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 2).map(d => d.text).join("\n");
}