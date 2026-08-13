import PostCard from "./PostCard";

export default function PostList({ posts, loading, editingId, reactions, onEdit, onDelete, onLike, onDislike }) {
  if (loading) {
    return <p className="empty">Loading entries...</p>;
  }

  if (posts.length === 0) {
    return <p className="empty">Nothing pinned yet. Write your first entry above.</p>;
  }

  return (
    <div className="pages">
      {posts.map((post, i) => (
        <PostCard
          key={post.id}
          post={post}
          tilt={i % 2 === 0 ? "-0.6deg" : "0.6deg"}
          isEditing={editingId === post.id}
          reaction={reactions[post.id]}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onDislike={onDislike}
        />
      ))}
    </div>
  );
}