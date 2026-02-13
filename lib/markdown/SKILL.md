# Lib/Markdown Folder - Markdown Processing

## Purpose
Convert Markdown to HTML with syntax highlighting using unified/remark/rehype pipeline.

## Pattern

```typescript
// lib/markdown/converter.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)        // Parse Markdown
    .use(remarkRehype)       // Convert to HTML
    .use(rehypeHighlight)    // Add syntax highlighting
    .use(rehypeStringify)    // Stringify HTML
    .process(markdown);
    
  return result.toString();
}
```

## Pipeline Explanation

1. **remarkParse** - Parse Markdown string to AST
2. **remarkRehype** - Convert Markdown AST to HTML AST
3. **rehypeHighlight** - Add syntax highlighting to code blocks
4. **rehypeStringify** - Convert HTML AST to string

## Usage Example

```typescript
// In API route or component
import { markdownToHtml } from '@/lib/markdown/converter';

const markdown = `
# Title

Some **bold** text and code:

\`\`\`javascript
const hello = "world";
\`\`\`
`;

const html = await markdownToHtml(markdown);
// Returns: <h1>Title</h1><p>Some <strong>bold</strong> text...</p>...
```

## In WikiArticle Model

```typescript
// When creating/updating article
const htmlContent = await markdownToHtml(content);

await WikiArticle.create({
  title,
  content,        // Original Markdown
  htmlContent,    // Converted HTML
});
```

## DO's ✅

- Use unified/remark/rehype pipeline
- Store both Markdown and HTML
- Add syntax highlighting for code blocks
- Sanitize output if from untrusted sources
- Use async/await
- Handle conversion errors

## DON'Ts ❌

- Don't create custom Markdown parser
- Don't skip syntax highlighting
- Don't only store Markdown or only HTML
- Don't forget error handling
- Don't expose conversion errors to users
