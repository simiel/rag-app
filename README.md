# RAG APP

A robust Retrieval-Augmented Generation (RAG) application built to demonstrate the power of context-aware AI. This project leverages the Vercel AI SDK to build a chatbot that answers questions based on a specific knowledge base, ensuring accurate and grounded responses.

## 🚀 Technical Overview

This application implements a complete RAG pipeline:

1.  **Knowledge Base Management**: Store and manage resources that serve as the AI's "long-term memory".
2.  **Vector Embeddings**: Content is processed into vector embeddings using OpenAI's embedding models.
3.  **Similarity Search**: Uses PostgreSQL with `pgvector` to perform efficient semantic search, retrieving the most relevant information for every user query.
4.  **Contextual Generation**: Retrieved information is injected into the LLM prompt, allowing it to answer questions it wasn't originally trained on.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router)
- **AI Orchestration:** [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Model Provider:** [OpenAI](https://openai.com)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [pgvector](https://github.com/pgvector/pgvector)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) & [shadcn/ui](https://ui.shadcn.com)

## ⚡ Getting Started

### Prerequisites

- Node.js & pnpm
- A PostgreSQL database (e.g., Vercel Postgres, Neon, or local)
- OpenAI API Key

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/rag-app.git
    cd rag-app
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Environment Setup**

    Copy the example environment file:

    ```bash
    cp .env.example .env.local
    ```

    Fill in your environment variables in `.env.local`:
    - `OPENAI_API_KEY`
    - `POSTGRES_URL`

4.  **Database Setup**

    Push the schema to your database:

    ```bash
    pnpm db:push
    ```

5.  **Run the application**

    ```bash
    pnpm dev
    ```

    Visit `http://localhost:3000` to see your app in action.

## 📜 Scripts

- `pnpm dev` - Start development server
- `pnpm db:generate` - Generate SQL migrations
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio to browse your data
