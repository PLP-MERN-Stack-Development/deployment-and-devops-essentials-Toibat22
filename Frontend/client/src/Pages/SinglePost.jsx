import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api"; 

const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id || user?._id || localStorage.getItem("userId");
const token = localStorage.getItem("token");

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch post
  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      setIsLiked(data.likes?.includes(userId));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch post");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // ADD COMMENT
  const handleAddComment = async () => {
    if (!commentText.trim()) return alert("Comment cannot be empty");
    setAddingComment(true);

    try {
      await api.post(`/posts/${id}/comment`, { content: commentText });
      setCommentText("");
      fetchPost();
    } catch (error) {
      console.error(error);
      alert("Could not add comment");
    } finally {
      setAddingComment(false);
    }
  };

  // LIKE / UNLIKE POST
  const handleLike = async () => {
    if (!userId) {
      alert("You must be logged in to like posts");
      return;
    }

    try {
      const { data } = await api.put(`/posts/${id}/like`);
      setIsLiked(!isLiked);
      setPost((prev) => ({
        ...prev,
        likes: isLiked
          ? prev.likes.filter((uid) => uid !== userId)
          : [...prev.likes, userId],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  if (!post) return <h2 className="text-center mt-10">Post not found.</h2>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-between">
          {post.title}

          {/* LIKE BUTTON */}
          <div className="mt-2 mb-4 flex items-center gap-2">
            <button
              onClick={handleLike}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm"
            >
              {isLiked ? "Unlike" : "Like"}
            </button>
            <span className="text-gray-600 text-sm">
              {post.likes?.length || 0} {post.likes?.length === 1 ? "Like" : "Likes"}
            </span>
          </div>

          {/* EDIT IF AUTHOR */}
          {post?.author && String(post.author?._id) === String(userId) && (
            <Link
              to={`/post/${post._id}/edit`}
              className="ml-4 bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>
          )}
        </h1>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 object-cover mt-4 rounded"
          />
        )}

        <p className="text-gray-600 mt-4 leading-relaxed">{post.content}</p>

        <p className="text-gray-700 mb-2 text-sm">
          Category: <b>{post.category?.name}</b>
        </p>

        {post.tags && post.tags.length > 0 && (
          <p className="text-gray-700 mt-2 text-sm">
            Tags:{" "}
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2">
                #{tag}
              </span>
            ))}
          </p>
        )}

        {/* COMMENTS */}
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-3">Comments</h2>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div key={c._id} className="mb-3 p-3 bg-gray-100 rounded relative">
                <p className="text-sm text-gray-800">{c.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  by <b>{c.user?.name || "Unknown User"}</b> • {new Date(c.createdAt).toLocaleString()}
                </p>

                {(c.user?._id === userId || post.author?._id === userId) && (
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this comment?")) return;
                      try {
                        await api.delete(`/posts/${post._id}/comment/${c._id}`);
                        fetchPost();
                      } catch (err) {
                        console.error(err);
                        alert("Failed to delete comment");
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}

          {token ? (
            <div className="mt-4">
              <textarea
                className="w-full border rounded p-2"
                rows="2"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>

              <button
                onClick={handleAddComment}
                disabled={addingComment}
                className="bg-blue-600 text-white px-4 py-1 rounded mt-2 hover:bg-blue-700"
              >
                {addingComment ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              <Link className="text-blue-600 underline" to="/login">Login to comment</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
