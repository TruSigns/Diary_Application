import { useState, useEffect } from "react";

export default function EntryForm({ editingPost, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");

  // Populate the form whenever a post is selected for editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setEntry(editingPost.entry);
    } else {
      setTitle("");
      setEntry("");
    }
  }, [editingPost]);

  const isEditing = Boolean(editingPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    const success = await onSubmit({ title, entry });
    if (success) {
      setTitle("");
      setEntry("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <input
        type="text"
        placeholder="Title this entry"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="What happened today..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={4}
      />
      <div className="form-actions">
        <button type="submit">{isEditing ? "Save changes" : "Pin to page"}</button>
        {isEditing && (
          <button type="button" className="cancel-edit" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}