// src/components/toolbar/TiptapToolbar.jsx (FINAL)
'use client';

import React from 'react';
import { FaBold, FaItalic, FaStrikethrough, FaHeading, FaListOl, FaListUl, FaQuoteLeft } from 'react-icons/fa';

const TiptapToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttonClass = (isActive) => 
    `p-2 rounded ${isActive ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-600 rounded-t-lg bg-dark-gray">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))} title="Bold">
        <FaBold />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))} title="Italic">
        <FaItalic />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))} title="Strikethrough">
        <FaStrikethrough />
      </button>
      <div className="border-l border-gray-600 h-6 mx-2"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))} title="Heading 2">
        <FaHeading /> <span className="text-xs">2</span>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive('heading', { level: 3 }))} title="Heading 3">
        <FaHeading /> <span className="text-xs">3</span>
      </button>
      <div className="border-l border-gray-600 h-6 mx-2"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))} title="Bullet List">
        <FaListUl />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))} title="Ordered List">
        <FaListOl />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))} title="Blockquote">
        <FaQuoteLeft />
      </button>
    </div>
  );
};

export default TiptapToolbar;