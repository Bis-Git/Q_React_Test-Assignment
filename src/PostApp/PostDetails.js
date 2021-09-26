import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CommentBlock from "./Comment";
import "bootstrap/dist/css/bootstrap.min.css";

const posts_url = "https://jsonplaceholder.typicode.com/posts/";
const users_url = "https://jsonplaceholder.typicode.com/users/";
const comments_url = "https://jsonplaceholder.typicode.com/posts/";

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getData = useCallback(async () => {
    const post_response = await fetch(posts_url + id);
    const post = await post_response.json();

    const user_response = await fetch(users_url + post.userId);
    const user = await user_response.json();

    const comments_response = await fetch(comments_url + post.id + "/comments");
    const comments = await comments_response.json();

    console.log(post);
    console.log(user);
    console.log(comments);

    setPost(post);
    setUser(user);
    setComments(comments);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <div class="card bg-light my-3">
        <div class="card-header">
          <h2>{user.name}</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">{post.title}</h5>
          <p class="card-text">{post.body}</p>
        </div>
        <h4 className="mx-3">Comments: </h4>
        <div>
          {comments.map((comment) => {
            return <CommentBlock key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
