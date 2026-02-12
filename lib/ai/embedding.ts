import { embedMany, embed } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { embeddings } from "../db/schema/embeddings";
import { db } from "../db";

const embeddingModel = "openai/text-embedding-ada-002";

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  input: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(input);

  const { embeddings } = await embedMany({
    values: chunks,
    model: embeddingModel,
  });

  return embeddings.map((embedding, i) => ({
    embedding,
    content: chunks[i],
  }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);
  return similarGuides;
};

export const clearMemory = async () => {
  await db.delete(embeddings);
};
