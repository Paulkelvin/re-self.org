// Converters between Sanity Portable Text and TipTap JSON

function key(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

type PTBlock = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  markDefs?: unknown[];
  children?: { _type: string; _key: string; text: string; marks: string[] }[];
  text?: string;
  cite?: string;
};

type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  text?: string;
  marks?: { type: string }[];
};

export function portableTextToTiptap(blocks: PTBlock[]): { type: string; content: TiptapNode[] } {
  const content: TiptapNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block._type === "block" && block.listItem === "bullet") {
      const items: TiptapNode[] = [];
      while (i < blocks.length && blocks[i]._type === "block" && blocks[i].listItem === "bullet") {
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: spansToTiptap(blocks[i].children ?? []),
            },
          ],
        });
        i++;
      }
      content.push({ type: "bulletList", content: items });
      continue;
    }

    if (block._type === "block") {
      const style = block.style ?? "normal";
      if (style === "h2") {
        content.push({
          type: "heading",
          attrs: { level: 2 },
          content: spansToTiptap(block.children ?? []),
        });
      } else {
        content.push({
          type: "paragraph",
          content: spansToTiptap(block.children ?? []),
        });
      }
    } else if (block._type === "quote") {
      content.push({
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: block.text ?? "" }],
          },
        ],
      });
    }

    i++;
  }

  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] };
}

function spansToTiptap(spans: { _type: string; _key: string; text: string; marks: string[] }[]): TiptapNode[] {
  return spans.map((span) => {
    const marks: { type: string }[] = (span.marks ?? []).map((m) => ({
      type: m === "strong" ? "bold" : m === "em" ? "italic" : m,
    }));
    return {
      type: "text",
      text: span.text,
      ...(marks.length ? { marks } : {}),
    };
  });
}

export function tiptapToPortableText(doc: { type: string; content?: TiptapNode[] }): PTBlock[] {
  const blocks: PTBlock[] = [];

  for (const node of doc.content ?? []) {
    if (node.type === "paragraph") {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: tiptapContentToSpans(node.content ?? []),
      });
    } else if (node.type === "heading") {
      const level = (node.attrs?.level as number) ?? 2;
      blocks.push({
        _type: "block",
        _key: key(),
        style: `h${level}`,
        markDefs: [],
        children: tiptapContentToSpans(node.content ?? []),
      });
    } else if (node.type === "bulletList") {
      for (const item of node.content ?? []) {
        const para = item.content?.[0];
        blocks.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: tiptapContentToSpans(para?.content ?? []),
        });
      }
    } else if (node.type === "blockquote") {
      const para = node.content?.[0];
      const text = para?.content?.[0]?.text ?? "";
      blocks.push({
        _type: "quote",
        _key: key(),
        text,
        cite: "",
      });
    }
  }

  return blocks;
}

function tiptapContentToSpans(nodes: TiptapNode[]) {
  return nodes.map((n) => ({
    _type: "span",
    _key: key(),
    text: n.text ?? "",
    marks: (n.marks ?? []).map((m) =>
      m.type === "bold" ? "strong" : m.type === "italic" ? "em" : m.type
    ),
  }));
}
