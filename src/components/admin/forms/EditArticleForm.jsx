// src/components/admin/forms/EditArticleForm.jsx (FINAL)
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapToolbar from '@/components/toolbar/TiptapToolbar';
import { toast } from 'sonner';

const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
};

export default function EditArticleForm() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [authorName, setAuthorName] = useState('Toba Lawfirm');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,

    editorProps: {
      attributes: { class: 'prose prose-invert max-w-none p-4 min-h-[300px] border border-gray-600 border-t-0 rounded-b-lg focus:outline-none bg-gray-800' },
    },
  });

  useEffect(() => {
    if (!id || !editor) return;
    
    const fetchArticleData = async () => {
      const docRef = doc(db, 'articles', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setSlug(data.slug);
        setAuthorName(data.authorName);
        if (editor) {
          editor.commands.setContent(data.content);
        }
      } else {
        setError("Article not found.");
        toast.error("Article not found.");
        router.push('/dashboard');
      }
    };
    fetchArticleData();
  }, [id, editor, router]);

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
    
    try {
      const docRef = doc(db, 'articles', id);
      await updateDoc(docRef, {
        title,
        slug,
        content: htmlContent,
        authorName,
        updatedAt: serverTimestamp(),
      });

      toast.success("Article updated successfully!");
      router.push('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update article.";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  if (!editor) { return null; }

  return (
    <div className="min-h-screen bg-dark-gray text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-Playfair_Display">Edit Article</h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600" required />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
            <input type="text" id="slug" value={slug} readOnly className="w-full p-3 bg-gray-800 text-gray-400 rounded border border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className="bg-yellow-500 text-black font-bold py-3 px-6 rounded hover:bg-yellow-400 disabled:bg-gray-500">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}