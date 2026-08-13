export default function PostCard({ post, tilt, isEditing, onEdit, onDelete, onLike, onDislike, reaction }) {
  return (
    <article
      className={`page ${isEditing ? "editing" : ""}`}
      style={{ "--tilt": tilt }}
    >
      <div className="page-meta">
        <span className="page-date">{post.date}</span>
        <span className="page-time">{post.time}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.entry}</p>

      <div className="reactions">
        <button
          className={`react like ${reaction === "like" ? "active" : ""}`}
          onClick={() => onLike(post.id)}
          disabled={Boolean(reaction)}
        >
          👍 {post.likes ?? 0}
        </button>
        <button
          className={`react dislike ${reaction === "dislike" ? "active" : ""}`}
          onClick={() => onDislike(post.id)}
          disabled={Boolean(reaction)}
        >
          👎 {post.dislikes ?? 0}
        </button>
      </div>

      <div className="page-actions">
        <button className="edit" onClick={() => onEdit(post)}>
          edit
        </button>
        <button className="remove" onClick={() => onDelete(post.id)}>
          remove
        </button>
      </div>
    </article>
  );
}