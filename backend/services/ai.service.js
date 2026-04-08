import axios from "axios";

export async function getAIResponse(context, question) {
  const API_KEY = process.env.GROQ_API_KEY;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // Why used this model only  ?
        messages: [
          {
            role: "user",
            content: `
                      Answer ONLY from the context below.
                      If not found, say "I don't know".

                      Context:
                      ${context}

                      Question:
                      ${question}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Groq Error:", error.message);
    if (error.response) {
      console.error("Groq Status:", error.response.status);
      console.error("Groq Response:", JSON.stringify(error.response.data, null, 2));
    }
    throw new Error("AI failed");
  }
}