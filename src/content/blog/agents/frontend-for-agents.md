---
title: "前端工程师的 AI 时代：为 Agent 构建 UI"
date: "2024-03-20"
description: "AI Agent（智能体）正在改变我们与软件交互的方式。作为前端工程师，我们需要思考如何为不确定的 AI 输出构建确定性的用户界面。"
---

# 前端工程师的 AI 时代：为 Agent 构建 UI

随着 ChatGPT 和 Claude 等大模型的兴起，AI Agent（智能体）开始从概念走向落地。传统的 UI 设计基于"点击-响应"的确定性流程，而 Agent 引入了推理和自然语言，这对前端开发提出了全新的挑战。

## 什么是 Agent UI？

Agent UI 不再是一组静态的表单或按钮，它更多是流式（Streaming）和生成式（Generative）的。用户不再是填写表单，而是与 Agent 对话，Agent 根据意图动态展示 UI 组件。

### 挑战：不确定性 vs 确定性

UI 是确定性的，代码必须精确知道渲染什么组件。AI 的输出是不确定性的文本。如何连接两者？

**Function Calling** 是关键。大模型可以输出结构化的 JSON，告诉前端"现在需要渲染一个图表"或者"展示一个确认框"。

```tsx
// 伪代码示例：使用 Vercel AI SDK 处理工具调用
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.toolInvocations?.map((tool) => {
            if (tool.toolName === "showStockChart") {
              return <StockChart data={tool.result} />;
            }
          })}
          <p>{m.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## 生成式 UI (Generative UI)

目前的趋势是**Generative UI**。不仅是内容由 AI 生成，连组件的组合方式也可以由 AI 决定。Vercel 的 `v0` 和 AI SDK RSC 正在探索这个方向，允许服务器流式传输 React 组件到客户端。

这将前端开发从"编写页面"转变为"编写组件系统"，AI 成为这个系统的运行时编排者。

## 总结

AI 并没有取代前端，反而提高了门槛。我们需要更懂流式传输、服务端组件（RSC）以及如何设计健壮的组件系统，以适应 AI 的动态编排。
