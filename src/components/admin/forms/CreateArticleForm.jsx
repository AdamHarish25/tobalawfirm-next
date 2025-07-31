// src/components/admin/forms/CreateArticleForm.jsx (FINAL)
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { EditorContent, useEditor } from "@tiptap/react";
import TiptapToolbar from "@/components/toolbar/TiptapToolbar";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "sonner";

const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};

export default function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [authorName, setAuthorName] = useState("Toba Lawfirm");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: "<p>Start writing your amazing article here...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none p-4 min-h-[300px] border border-gray-600 border-t-0 rounded-b-lg focus:outline-none bg-gray-800",
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
    setError("");
    const htmlContent = editor.getHTML();

    if (!title || htmlContent === "<p></p>") {
      setError("Title and Content are required.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";
      if (imageUpload) {
        setUploading(true);
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const formData = new FormData();
        formData.append("file", imageUpload);
        formData.append("upload_preset", uploadPreset);
        const response = await fetch(url, { method: "POST", body: formData });
        const data = await response.json();

        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          throw new Error("Image upload failed.");
        }
        setUploading(false);
      }

      await addDoc(collection(db, "articles"), {
        title, slug, content: htmlContent, authorName, isPublished: false,
        createdAt: serverTimestamp(), featuredImageUrl: imageUrl,
      });

      toast.success("Article saved successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating article:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to save article.";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-Playfair_Display">Create New Article</h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-1">Featured Image</label>
            <input type="file" id="featuredImage" onChange={(event) => event.target.files && setImageUpload(event.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400" />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-yellow-500" required />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">URL Slug (auto-generated)</label>
            <input type="text" id="slug" value={slug} readOnly className="w-full p-3 bg-gray-800 text-gray-400 rounded border border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading || uploading} className="bg-yellow-500 text-black font-bold py-3 px-6 rounded hover:bg-yellow-400 disabled:bg-gray-500">
              {loading ? "Saving..." : uploading ? "Uploading Image..." : "Save as Draft"}
            </button>
            <button type="button" onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}