import { findRelevantDocsVector } from "../services/vector.service.js";
import { getAIResponse } from "../services/ai.service.js";

export const chatController = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 1. Get context (RAG)
    const context = await findRelevantDocsVector(question);

    // 2. AI response
    const answer = await getAIResponse(context, question);

    return res.status(200).json({ answer });

  } catch (error) {
    next(error);
  }
};