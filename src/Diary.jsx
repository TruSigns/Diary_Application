import { useState } from "react";
import { usePosts } from "./usePosts";
import EntryForm from "./EntryForm";
import PostList from "./PostList";
import Fireflies from "./Fireflies";
import "./Diary.css";

export default function Diary() {
  const {
    posts,
    loading,
    reactions,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
  } = usePosts();
  const [editingId, setEditingId] = useState(null);

  const editingPost = posts.find((p) => p.id === editingId) || null;

  const handleSubmit = async (formData) => {
    const success = editingId
      ? await updatePost(editingId, formData)
      : await addPost(formData);

    if (success) setEditingId(null);
    return success;
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="notebook">
      <Fireflies />
      <div className="spine" aria-hidden="true"></div>

      <div className="notebook-content">
        <header className="notebook-header">
          <span className="eyebrow">Vol. 01</span>
          <h1>Field Notes</h1>
        </header>

        <EntryForm
          editingPost={editingPost}
          onSubmit={handleSubmit}
          onCancel={() => setEditingId(null)}
        />

        <PostList
          posts={posts}
          loading={loading}
          editingId={editingId}
          reactions={reactions}
          onEdit={(post) => setEditingId(post.id)}
          onDelete={handleDelete}
          onLike={likePost}
          onDislike={dislikePost}
        />
      </div>
    </div>
  );
}
