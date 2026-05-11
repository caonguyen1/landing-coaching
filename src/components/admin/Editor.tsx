'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn =
    'p-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center';

  const active = 'bg-purple-100 text-purple-600';

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
      
      {/* 🔥 TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-300 p-2 bg-gray-50">

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive('bold') ? active : ''}`}
        >
          <FaBold size={14} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor.isActive('italic') ? active : ''}`}
        >
          <FaItalic size={14} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />


        {/* Bullet list */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} ${
            editor.isActive('bulletList') ? active : ''
          }`}
        >
          <FaListUl size={14} />
        </button>

        {/* Ordered list */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btn} ${
            editor.isActive('orderedList') ? active : ''
          }`}
        >
          <FaListOl size={14} />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={btn}
        >
          <FaUndo size={14} />
        </button>

        {/* Redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={btn}
        >
          <FaRedo size={14} />
        </button>
      </div>

      {/* ✏️ EDITOR */}
      <div className='p-5'>
        <div >
          <EditorContent editor={editor} className="outline-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
}