import axios from "axios";

export async function getAIResponse(context, question) {
  const API_KEY = process.env.GROQ_API_KEY;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a helpful refund policy assistant.
Answer ONLY from the context provided.
If the answer is not in the context, say "I don't have information about that."
Keep answers concise and clear.`,
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${question}`,
          },
        ],
        temperature: 0.1, // low = more factual, less creative
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error.message);
    if (error.response) {
      console.error("Groq Status:", error.response.status);
      console.error(
        "Groq Response:",
        JSON.stringify(error.response.data, null, 2),
      );
    }
    throw new Error("AI failed");
  }
}
