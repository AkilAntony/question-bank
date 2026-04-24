"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { FaBold, FaCode, FaItalic } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

const TiptapComponent = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: "<p>Hello World!</p>",
  });

  if (!editor) return null;

  console.log(editor.isActive("bold"), "editor");

  return (
    <div className="border border-gray-300  rounded">
      {/* Toolbar */}
      <div className="flex gap-4 mb-2 border-gray-300 justify-end   border-b p-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
          className={editor.isActive("bold") ? "bg-blue-500 text-white" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-blue-500 text-white" : ""}
          type="button"
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
          className={
            editor.isActive("bulletList") ? "bg-blue-500 text-white" : ""
          }
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          // className={
          //   editor.isActive("code") ? "bg-blue-500 text-white" : "bg-red-500"
          // }
          type="button"
        >
          <FaCode />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className=" w-full" />
    </div>
  );
};

export default TiptapComponent;
