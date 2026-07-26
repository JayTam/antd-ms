# 领域文档

工程 skill 在探索代码库时应如何消费本仓库的领域文档。

## 探索前先读这些

- 仓库根目录的 **`CONTEXT.md`**，或
- 仓库根目录的 **`CONTEXT-MAP.md`**（若存在）- 它指向每个 context 一个 `CONTEXT.md`。读与你主题相关的那些。
- **`docs/adr/`** - 读触及你即将工作区域的 ADR。多 context 仓库中，也检查 `src/<context>/docs/adr/` 里的 context 范围决策。

如果这些文件不存在，**静默继续**。不要标记它们的缺失；不要预先建议创建。`/domain-modeling` skill（经 `/grill-with-docs` 和 `/improve-codebase-architecture` 触达）会在术语或决策真正被解决时惰性创建它们。

## 文件结构

单 context 仓库（大多数仓库）：

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

多 context 仓库（根目录存在 `CONTEXT-MAP.md`）：

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← 系统级决策
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context 特定决策
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用 glossary 的词汇

当你的输出提到一个领域概念（issue 标题、重构提案、假设、测试名）时，使用 `CONTEXT.md` 中定义的术语。不要漂移到 glossary 明确避免的同义词。

如果你需要的概念还不在 glossary 里，那是一个信号 - 要么你在发明项目不用的语言（重新考虑），要么真有一个缺口（记下来交给 `/domain-modeling`）。

## 标注 ADR 冲突

如果你的输出与某个已有 ADR 矛盾，显式提出来，而不是静默覆盖：

> _与 ADR-0007（event-sourced orders）冲突 - 但值得重开，因为……_
