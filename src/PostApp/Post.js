import React, { useState, useEffect, useCallback } from "react";
import { useGreeter } from "./useGreeter";
import CommentBlock from "./Comment";
import "bootstrap/dist/css/bootstrap.min.css";

const comments_url = "https://jsonplaceholder.typicode.com/posts/";

const Post = ({ post, user }) => {
  useGreeter("Post");

  const { id, title, body } = post;
  const { name } = user[0];

  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    const comments_response = await fetch(comments_url + id + "/comments");
    const comments = await comments_response.json();
    setComments(comments);
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div>
      <div class="card bg-light mb-3">
        <div class="card-header">
          <h2>{name}</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{body}</p>
        </div>
        <h4 className="mx-3">Comments: </h4>
        {comments.map((comment) => {
          return <CommentBlock key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Post;
