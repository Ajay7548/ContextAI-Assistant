import axios from "axios";

// Get the actual vector (384 numbers) for any text
export async function getEmbedding(text) {
  const response = await axios.post(
"https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  // HF returns [[...vector...]] — we want the inner array
  const result = response.data;
  return Array.isArray(result[0]) ? result[0] : result;
}