"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaCode, FaItalic, FaListUl } from "react-icons/fa";

const TiptapComponent = ({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: "",
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const tools = [
    { icon: FaBold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive("bold") },
    { icon: FaItalic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive("italic") },
    { icon: FaListUl, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive("bulletList") },
    { icon: FaCode, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive("codeBlock") },
  ];

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-2 border-b border-[#e2e8f0] bg-[#f8fafc]">
        {tools.map((tool, i) => (
          <button
            key={i}
            type="button"
            onClick={tool.action}
            className={`p-2 rounded-md text-sm transition-colors ${
              tool.isActive
                ? "bg-[#4f46e5] text-white"
                : "text-[#64748b] hover:bg-[#e2e8f0]"
            }`}
          >
            <tool.icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} className="w-full" />
    </div>
  );
};

export default TiptapComponent;
