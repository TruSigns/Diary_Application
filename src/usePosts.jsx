import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const REACTIONS_KEY = "diary-reactions";

function loadReactions() {
  const saved = localStorage.getItem(REACTIONS_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveReactions(reactions) {
  localStorage.setItem(REACTIONS_KEY, JSON.stringify(reactions));
}

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState(loadReactions);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  const addPost = async ({ title, entry }) => {
    const newPost = {
      title: title.trim() || "Untitled",
      entry: entry.trim(),
      date: new Date().toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      likes: 0,
      dislikes: 0,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select();

    if (error) {
      console.error("Error adding post:", error.message);
      return false;
    }

    setPosts((prev) => [data[0], ...prev]);
    return true;
  };

  const updatePost = async (id, { title, entry }) => {
    const updates = {
      title: title.trim() || "Untitled",
      entry: entry.trim(),
    };

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating post:", error.message);
      return false;
    }

    setPosts((prev) => prev.map((p) => (p.id === id ? data[0] : p)));
    return true;
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error.message);
      return false;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  const likePost = async (id) => {
    if (reactions[id]) return; // already reacted to this post

    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const { data, error } = await supabase
      .from("posts")
      .update({ likes: post.likes + 1 })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error liking post:", error.message);
      return;
    }

    setPosts((prev) => prev.map((p) => (p.id === id ? data[0] : p)));

    const updated = { ...reactions, [id]: "like" };
    setReactions(updated);
    saveReactions(updated);
  };

  const dislikePost = async (id) => {
    if (reactions[id]) return; // already reacted to this post

    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const { data, error } = await supabase
      .from("posts")
      .update({ dislikes: post.dislikes + 1 })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error disliking post:", error.message);
      return;
    }

    setPosts((prev) => prev.map((p) => (p.id === id ? data[0] : p)));

    const updated = { ...reactions, [id]: "dislike" };
    setReactions(updated);
    saveReactions(updated);
  };

  return {
    posts,
    loading,
    reactions,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
  };
}