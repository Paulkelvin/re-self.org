"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { portableTextToTiptap, tiptapToPortableText } from "@/lib/admin/portableText";

interface Props {
  label: string;
  value: unknown[] | null | undefined;
  onChange: (val: unknown[]) => void;
  required?: boolean;
}

export function RichTextField({ label, value, onChange, required }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: portableTextToTiptap((value as Parameters<typeof portableTextToTiptap>[0]) ?? []),
    onUpdate({ editor }) {
      onChange(tiptapToPortableText(editor.getJSON() as Parameters<typeof tiptapToPortableText>[0]));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] px-4 py-3 focus:outline-none prose prose-sm max-w-none text-[#2a3535]",
      },
    },
  });

  // Sync when value changes externally (e.g. loading existing doc)
  useEffect(() => {
    if (!editor || !value) return;
    const current = JSON.stringify(editor.getJSON());
    const incoming = JSON.stringify(portableTextToTiptap((value as Parameters<typeof portableTextToTiptap>[0]) ?? []));
    if (current !== incoming) {
      editor.commands.setContent(portableTextToTiptap((value as Parameters<typeof portableTextToTiptap>[0]) ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `px-2 py-1 rounded text-sm font-medium transition ${active ? "bg-[#4a5840] text-white" : "text-[#4a5840] hover:bg-[#eef3ee]"}`;

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4a5840]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-[#c4d4d0] bg-[#f4f7f4] px-3 py-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>
          <em>I</em>
        </button>
        <span className="mx-1 h-4 w-px bg-[#c4d4d0]" aria-hidden="true" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}>
          H2
        </button>
        <span className="mx-1 h-4 w-px bg-[#c4d4d0]" aria-hidden="true" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>
          • List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}>
          &ldquo; Quote
        </button>
        <span className="mx-1 h-4 w-px bg-[#c4d4d0]" aria-hidden="true" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>
          ↺
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>
          ↻
        </button>
      </div>

      {/* Editor body */}
      <div className="rounded-b-lg border border-t-0 border-[#c4d4d0] bg-white transition-shadow focus-within:ring-2 focus-within:ring-[#5e6d52]/20">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
