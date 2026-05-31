# Comment — Fix the table formatting on the Overview page

| | |
|---|---|
| **ID** | 20260528-211556-532 |
| **Status** | Resolved |
| **Kind** | Bug |
| **Page** | Overview |
| **Story** | `overview--docs` |
| **URL** | [open in Storybook](https://dev.tailb19d9.ts.net:6006/?path=/docs/overview--docs) |
| **Environment** | — |
| **Captured** | 2026-05-28T21:15:56.532Z |
| **Resolution** | Resolved 2026-05-28T21:41:39.295Z (see below) |

---

## Request

> Can we fix the table formatting on this page. It is rendering with | characters as a string

## Response / Resolution

Enabled GitHub-Flavored Markdown in the Storybook docs pipeline — added `remark-gfm`
to `@storybook/addon-docs` `mdxCompileOptions` in
[.storybook/main.ts](/Users/kwaight/src/ai-conversations/web/.storybook/main.ts).
Markdown tables now render as real `<table>` elements instead of literal `|` text
(verified the compiled Overview MDX chunk emits a table component).

Also fixed the underlying cause that the page id was logged instead of the title:
the comment widget now resolves the human title from `/index.json`.
