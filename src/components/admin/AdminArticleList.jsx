// src/components/admin/AdminArticleList.jsx (FINAL)
'use client';

import React from 'react';

function AdminArticleList({ articles, loading, onEdit, onDelete, onTogglePublish }) {
  if (loading) {
    return <p className="text-gray-400 mt-8">Loading articles...</p>;
  }

  return (
    <div className="bg-dark-white p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Manage Articles</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-xs text-gray-400 uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map(article => (
                <tr key={article.id} className="border-b border-gray-700 hover:bg-dark-gray">
                  <td className="px-6 py-4 font-medium text-white">{article.title}</td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={article.isPublished} 
                        onChange={() => onTogglePublish(article.id, !article.isPublished)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      <span className="ml-3 text-sm font-medium">
                        {article.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    {article.createdAt ? new Date(article.createdAt.seconds * 1000).toLocaleDateString('en-CA') : 'No date'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => onEdit(article.id)} className="font-medium text-yellow-500 hover:underline mr-4">Edit</button>
                    <button onClick={() => onDelete(article.id)} className="font-medium text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400">No articles found. Click "Create New Article" to add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminArticleList;