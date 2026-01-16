---
title: "使用 Next.js 和 LangChain 构建个人知识库 (RAG)"
date: "2024-02-15"
description: "如何利用 RAG (Retrieval-Augmented Generation) 技术，结合 Next.js 全栈能力，快速搭建一个能够回答私有数据问题的 AI 助手。"
---

# 使用 Next.js 和 LangChain 构建个人知识库

RAG (检索增强生成) 是目前解决大模型幻觉和知识过时问题的最佳实践。本文记录了我使用 Next.js 全栈框架和 LangChain 搭建个人文档问答系统的过程。

## 架构概览

1.  **数据预处理 (Ingestion)**:

    - 读取 Markdown/PDF 文档。
    - 使用 LangChain 的 `RecursiveCharacterTextSplitter` 进行文本分块。
    - 调用 OpenAI Embedding API 将文本转换为向量。
    - 存入向量数据库 (如 Supabase pgvector 或 Pinecone)。

2.  **检索与生成 (Retrieval & Generation)**:
    - 用户输入问题。
    - 将问题转换为向量，在数据库中进行相似度搜索。
    - 提取最相关的 3-5 个片段。
    - 将 System Prompt + 相关片段 + 用户问题 发给 GPT-4。
    - 流式返回答案。

## 核心代码片段：向量存储

在 Next.js 的 API Route 中处理文档向量化非常方便：

```typescript
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function addDocument(text: string) {
  const embeddings = new OpenAIEmbeddings();

  await SupabaseVectorStore.fromTexts(
    [text],
    [{ source: "my-doc" }],
    embeddings,
    {
      client: supabaseClient,
      tableName: "documents",
    }
  );
}
```

## 遇到的坑

### 1. 文本切分策略

切分太小，丢失上下文；切分太大，向量检索精度下降。对于中文文档，按段落切分通常比按字数切分效果好，但 LangChain 默认的分隔符对中文支持一般，需要自定义 separators。

### 2. Vercel 的运行时限制

Vercel Serverless Function 有执行时间限制（默认 10 秒）。如果一次性处理大量文档，很容易超时。解决方案是使用 **Vercel AI SDK 的流式响应** 或者将长任务放入 **后台队列 (如 Inngest)**。

## 结语

Next.js 的全栈能力让 RAG 应用的开发变得非常顺滑。结合 Vercel AI SDK，我们可以在几天内就构建出一个生产级别的知识库应用。
