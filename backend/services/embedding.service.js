import axios from "axios";

// Uses HuggingFace Sentence Similarity API
// Returns an array of similarity scores (one per doc)
export async function getSimilarityScores(question, docs) {
  const response = await axios.post(
    "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2",
    {
      inputs: {
        source_sentence: question,
        sentences: docs,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
console.log(response.data);
  return response.data; // array of floats e.g. [0.85, 0.32, ...]
}
