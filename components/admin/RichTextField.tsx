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
          "min-h-[220px] px-4 py-3 focus:outline-none prose prose-sm max-w-none text-[#2a3535] prose-headings:font-serif prose-h2:text-[#2e3a2a] prose-h2:tracking-tight prose-blockquote:border-l-[3px] prose-blockquote:border-[#4a5840]/40 prose-blockquote:text-[#4a5840]/75 prose-blockquote:not-italic",
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
    `px-2 py-1 rounded-md text-xs font-medium transition ${active ? "bg-[#4a5840] text-white" : "text-[#4a5840] hover:bg-[#eef3ee]"}`;

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#3d4b35]">
        <span className="block h-3 w-[2px] flex-shrink-0 rounded-full bg-[#4a5840]/55" aria-hidden="true" />
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
        <button type="button" onClick={() => editor.chain().focus().undo().run()} aria-label="Undo" className={btn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} aria-label="Redo" className={btn(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>

      {/* Editor body */}
      <div className="rounded-b-lg border border-t-0 border-[#c4d4d0] bg-white transition-shadow focus-within:ring-2 focus-within:ring-[#5e6d52]/20">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
