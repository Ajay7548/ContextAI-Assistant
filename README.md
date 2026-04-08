# ContextAI Assistant

ContextAI Assistant is a modern, responsive web application that provides a smart chat interface to interact with AI models using the Groq API. It also utilizes Hugging Face for document embeddings and sentence similarity. The app features an optimized user interface built for a seamless chatting experience, complete with intelligent scrolling, dynamic layout management, and an organized component architecture.

## AI Concepts Covered
- Retrieval-Augmented Generation (RAG)
- Vector Embeddings (HuggingFace all-MiniLM-L6-v2)
- Semantic Search with Cosine Similarity
- LLM Inference (Groq — llama-3.1-8b-instant)
- In-memory Vector Store (no external DB needed)
- Pre-computed Embeddings at startup
  
Live Site : [LIVE](https://context-ai-assistant.vercel.app/)

## Project Structure

This project adopts a decoupled client-server architecture:

- **`frontend/`**: A React single-page application built with Vite and styled using Tailwind CSS.
- **`backend/`**: An Express.js Node server that securely handles communication with AI APIs (Groq for chat completions and Hugging Face Inference API for embeddings).

## Technologies Used

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- Lucide React (for icons)
- Axios

### Backend
- Node.js & Express.js
- Groq API (for fast LLM inference)
- Hugging Face Inference API (for sentence embeddings)
- Axios, Cors & Dotenv

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn
- Valid API keys for [Groq](https://console.groq.com/) and [Hugging Face](https://huggingface.co/settings/tokens)

## Setup & Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd "ContextAI Assistant"
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

In the `backend/` directory, locate or create a `.env` file and configure your API credentials and environment variables:

```env
GROQ_API_KEY=your_groq_api_key_here
HF_API_KEY=your_hugging_face_api_key_here
PORT=5000
```
*(Make sure not to commit your actual `.env` file to version control.)*

## Running the Application

You'll need two separate terminal windows/tabs to run the frontend and backend simultaneously.

### 1. Start the Backend Server

```bash
cd backend
node index.js
```
The server will start and typically listen on port `5000`.

### 2. Start the Frontend Server

```bash
cd frontend
npm run dev
```
Vite will launch the development server, usually available at `http://localhost:5173`. Open this URL in your browser to view the application.

