import { docs } from "../data/docs.js";
import { getEmbedding } from "./embedding.service.js";

// Stored in memory — computed once at startup
let docVectors = [];

// Call this ONCE when your server starts
export async function initVectors() {
  console.log("⏳ Embedding docs...");
  docVectors = await Promise.all(docs.map((d) => getEmbedding(d)));
  console.log(`✅ ${docVectors.length} docs embedded and stored in memory`);
}

export async function findRelevantDocsVector(question) {
  if (docVectors.length === 0) {
    throw new Error("Vectors not initialised — call initVectors() on startup");
  }

  // Only 1 API call now (just the question)
  const qVec = await getEmbedding(question);

  const scored = docs.map((text, i) => ({
    text,
    score: cosineSim(qVec, docVectors[i]),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Return top 2 most relevant docs
  return scored.slice(0, 2).map((d) => d.text).join("\n");
}

// Local math — no API call, instant
function cosineSim(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}