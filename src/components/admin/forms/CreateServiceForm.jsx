// src/components/admin/forms/CreateServiceForm.jsx (FINAL)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'sonner';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapToolbar from '@/components/toolbar/TiptapToolbar';

const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
};

export default function CreateServiceForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: '<p>Enter the detailed service description here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none p-4 min-h-[300px] border border-gray-600 border-t-0 rounded-b-lg focus:outline-none bg-gray-800',
      },
    },
  });

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(createSlug(newTitle));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return;

    setLoading(true);
    const htmlContent = editor.getHTML();

    if (!title || !subtitle || htmlContent === '<p></p>') {
      toast.error('Title, Subtitle, and Content are required.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'services'), {
        title,
        slug,
        subtitle,
        content: htmlContent,
        isPublished: false,
        createdAt: serverTimestamp(),
        featuredImageUrl: 'https://via.placeholder.com/1200x500', // Default image
      });

      toast.success("Service created successfully!");
      router.push('/dashboard');
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Failed to save service. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-Playfair_Display">Create New Service</h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Service Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full p-3 bg-gray-700 rounded border border-gray-600" required />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">URL Slug (auto-generated)</label>
            <input type="text" id="slug" value={slug} readOnly className="w-full p-3 bg-gray-800 text-gray-400 rounded" />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-1">Subtitle (Short Summary)</label>
            <input type="text" id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Detailed Content</label>
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className="bg-yellow-500 text-black font-bold py-3 px-6 rounded hover:bg-yellow-400 disabled:bg-gray-500">
              {loading ? 'Saving...' : 'Save Service as Draft'}
            </button>
            <button type="button" onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}