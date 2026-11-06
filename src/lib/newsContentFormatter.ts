/**
 * News Content Formatter
 * Handles diverse API formats: Raw HTML, Plain Text with line breaks, Markdown (bold, links, lists),
 * and mixed content, rendering beautiful, accessible, and responsive article layouts.
 */

export function formatNewsArticleHtml(raw?: string): string {
  if (!raw) return "";

  let content = raw.trim();

  // 1. Strip markdown code fences if wrapped in ```html ... ``` or ```markdown
  content = content.replace(/^```(?:html|markdown|text)?\s*/i, "");
  content = content.replace(/\s*```$/i, "");

  // 2. Normalize hardcoded external reference links to internal app routes
  content = content.replace(
    /https?:\/\/(?:www\.)?ipo-trend\.com\/ipo-gmp\b/gi,
    "/ipo-gmp"
  );
  content = content.replace(
    /https?:\/\/(?:www\.)?ipo-trend\.com\/subscription\b/gi,
    "/subscription"
  );
  content = content.replace(
    /https?:\/\/(?:www\.)?ipo-trend\.com\/(?:ipo-allotment-status|allotment)\b/gi,
    "/allotment"
  );

  // 3. Helper to parse inline markdown (links, bold, italic)
  const parseInlineMarkdown = (str: string): string => {
    return str
      // Markdown links: [Title](url) -> <a href="url">Title</a>
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline font-semibold hover:text-accent/80 transition-colors">$1</a>'
      )
      // Bold: **text** or __text__ -> <strong>text</strong>
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-tx font-bold">$1</strong>')
      .replace(/__([^_]+)__/g, '<strong class="text-tx font-bold">$1</strong>')
      // Italic: *text* or _text_ -> <em>text</em>
      .replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, '$1<em class="italic text-tx/90">$2</em>$3');
  };

  // 4. Detect if content already contains structural HTML tags (<p>, <article>, <h1-6>, <ul>, <div>)
  const hasBlockHtml = /<(?:article|p|h[1-6]|ul|ol|li|div|blockquote|table)[\s>]/i.test(content);

  if (hasBlockHtml) {
    // If it has HTML, parse any remaining raw markdown links or bolds inside
    content = parseInlineMarkdown(content);

    // Style any plain <a> tags without classes
    content = content.replace(
      /<a\b([^>]*?)>/gi,
      (match, attrs) => {
        if (!attrs.includes("class=")) {
          return `<a ${attrs} class="text-accent underline font-semibold hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">`;
        }
        return match;
      }
    );

    return content;
  }

  // 5. Plain Text / Markdown Processing:
  // Split into paragraph blocks separated by 2 or more newlines
  const blocks = content.split(/\n{2,}/);

  const formattedBlocks = blocks.map((rawBlock) => {
    const block = rawBlock.trim();
    if (!block) return "";

    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

    // Check if the entire block is a list (every line starts with -, *, or numbered 1., 2.)
    const isBulletList = lines.length > 0 && lines.every((line) => /^[-*•]\s+/.test(line));
    const isNumberedList = lines.length > 0 && lines.every((line) => /^\d+\.\s+/.test(line));

    if (isBulletList) {
      const items = lines
        .map((line) => {
          const cleanLine = line.replace(/^[-*•]\s+/, "");
          return `<li class="leading-relaxed text-tx/90 pl-1">${parseInlineMarkdown(cleanLine)}</li>`;
        })
        .join("\n");
      return `<ul class="list-disc pl-6 space-y-2.5 my-4 marker:text-accent">${items}</ul>`;
    }

    if (isNumberedList) {
      const items = lines
        .map((line) => {
          const cleanLine = line.replace(/^\d+\.\s+/, "");
          return `<li class="leading-relaxed text-tx/90 pl-1">${parseInlineMarkdown(cleanLine)}</li>`;
        })
        .join("\n");
      return `<ol class="list-decimal pl-6 space-y-2.5 my-4 marker:text-accent font-medium">${items}</ol>`;
    }

    // Check for Headings: #, ##, ###
    if (/^###\s+/.test(block)) {
      return `<h3 class="font-heading font-bold text-base sm:text-lg text-tx pt-5 pb-1">${parseInlineMarkdown(
        block.replace(/^###\s+/, "")
      )}</h3>`;
    }
    if (/^##\s+/.test(block)) {
      return `<h2 class="font-heading font-extrabold text-lg sm:text-xl text-tx pt-6 pb-2 border-b border-line/60">${parseInlineMarkdown(
        block.replace(/^##\s+/, "")
      )}</h2>`;
    }
    if (/^#\s+/.test(block)) {
      return `<h2 class="font-heading font-extrabold text-xl sm:text-2xl text-tx pt-6 pb-2 border-b border-line/60">${parseInlineMarkdown(
        block.replace(/^#\s+/, "")
      )}</h2>`;
    }

    // Check if single line is bold title like "**Heading**"
    if (/^\*\*[^*]+\*\*$/.test(block)) {
      return `<h3 class="font-heading font-bold text-base sm:text-lg text-tx pt-5 pb-1">${parseInlineMarkdown(
        block
      )}</h3>`;
    }

    // Regular paragraph: convert single linebreaks into <br /> and parse markdown
    const formattedParagraph = parseInlineMarkdown(lines.join("<br />"));
    return `<p class="text-xs sm:text-sm text-tx/90 leading-relaxed sm:leading-loose mb-4">${formattedParagraph}</p>`;
  });

  return formattedBlocks.filter(Boolean).join("\n\n");
}
