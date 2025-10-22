import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send } from "lucide-react";

export const CommentSection = ({
  comments = [],
  onAddComment,
  onAddReply,
  onAddLike,
  currentUserId,
  likesLoading = false,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleSetReplyingTo = (commentId) => {
    setNewReply("");
    setReplyingTo((prev) => (prev === commentId ? null : commentId));
  };

  //console.log("comments in CommentSection:", comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    /*
    console.log(
      "Submitting reply to comment ID:",
      replyingTo,
      "with content:",
      newReply
    );
    */
    if (newReply.trim()) {
      onAddReply(newReply, replyingTo);
      setReplyingTo(null);
      setNewReply("");
    }
  };

  useEffect(() => {
    if (replyingTo === null) {
      setNewReply("");
    }
  }, [replyingTo]);

  const userHasLiked = (likeIds) => {
    if (!currentUserId || !likeIds || likeIds.length === 0) return false;

    const likeIdNumbers = likeIds.map((id) =>
      typeof id === "object" ? id.userId : id
    );
    return likeIdNumbers.includes(currentUserId);
  };

  return (
    <section className="space-y-6">
      <div className="border-blog-border border-t pt-12">
        <h2 className="text-foreground mb-8 flex items-center gap-2 text-2xl font-bold">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border-blog-border mb-12 rounded-xl border p-6"
        >
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-blog-border focus:border-primary min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => {
            const liked = userHasLiked(comment.likeIds);

            return (
              <div
                key={comment.id}
                className="bg-card border-blog-border hover:bg-blog-hover rounded-xl border p-6 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={comment.user.username}
                      alt={comment.user.username}
                    />
                    <AvatarFallback>
                      {comment.user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{comment.user.username}</p>
                        <p className="text-blog-meta text-sm">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-blog-content leading-relaxed">
                      {comment.content}
                    </p>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 transition-colors ${
                          liked
                            ? "text-red-500 hover:text-red-600"
                            : "text-blog-meta hover:text-primary"
                        }`}
                        onClick={() => onAddLike({ commentId: comment.id })}
                        disabled={likesLoading}
                      >
                        <Heart
                          className="h-4 w-4"
                          fill={liked ? "currentColor" : "none"}
                        />
                        {comment.likeCount || 0}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blog-meta hover:text-primary"
                        onClick={() => handleSetReplyingTo(comment.id)}
                      >
                        {replyingTo === comment.id ? "Cancel" : "Reply"}
                      </Button>
                    </div>
                    {replyingTo === comment.id && (
                      <form onSubmit={handleSubmitReply} className="mt-4">
                        <Textarea
                          placeholder={`Reply to ${comment.user.username}...`}
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          className="border-blog-border focus:border-primary min-h-[80px] resize-none"
                        />
                        <div className="flex justify-end mt-2">
                          <Button type="submit" className="gap-2">
                            <Send className="h-4 w-4" />
                            Post Reply
                          </Button>
                        </div>
                      </form>
                    )}
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="ml-10 mt-4 border-l pl-4"
                        >
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={reply.user.username}
                                alt={reply.user.username}
                              />
                              <AvatarFallback>
                                {reply.user.username.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <p className="">{reply.user.username}</p>
                              <p className="text">
                                {" "}
                                {new Date(reply.createdAt).toLocaleString()}
                              </p>
                              <p className="">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
