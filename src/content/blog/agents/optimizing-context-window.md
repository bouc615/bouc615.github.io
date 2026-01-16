---
title: "大模型上下文窗口优化：长对话管理的策略"
date: "2024-01-10"
description: "随着 LLM 支持的 Context Window 越来越大，真的就可以无脑塞入所有数据了吗？本文探讨长对话场景下的 Token 优化策略。"
---

# 大模型上下文窗口优化：长对话管理的策略

GPT-4 Turbo 支持 128k context，Claude 3 支持 200k 甚至更多。看起来我们再也不用担心 Token 溢出了，但实际工程中，"大海捞针" (Needle in a Haystack) 问题依然存在：输入越长，模型对中间信息的注意力越弱。

## 为什么要优化 Context Window？

1.  **成本**：Input Token 也是钱。每次对话都把整本书发过去，成本不可接受。
2.  **延迟**：首字延迟 (TTFT) 与 Input Token 数量正相关。
3.  **效果**：无关信息干扰模型推理，导致幻觉。

## 常见优化策略

### 1. 滑动窗口 (Sliding Window)

最简单粗暴的方法。只保留最近的 N 轮对话。

- **优点**：实现简单，Token 使用量恒定。
- **缺点**：会遗忘早期的关键指令或信息（如"我的名字是..."）。

### 2. 摘要压缩 (Summarization)

在滑动窗口的基础上，将丢弃的早期对话通过 LLM 总结成一段摘要 (Summary)，作为 System Prompt 的一部分带入下一轮。

```text
System: 你是一个助手。
Context Summary: 用户叫 Bob，是一名 Python 工程师。之前讨论了 Django 的部署问题。
User: 刚才说的 Dockerfile 怎么写？
```

### 3. 选择性修剪 (Selective Pruning)

对于复杂的 Prompt，可以移除停用词，或者更智能地，计算 Token 的 Self-Attention 权重，移除权重低的 Token（如 LLMLingua 框架）。

## 我们的实践

在生产环境中，我们通常采用**混合策略**：

1.  **System Prompt**：始终保留。
2.  **关键记忆**：通过 RAG 或特定字段保存用户偏好。
3.  **近期对话**：保留最近 10-20 轮完整对话。
4.  **中期对话**：进行摘要。

这样既保证了长期记忆，又控制了单次请求的 Token 消耗，实现了成本与体验的平衡。
