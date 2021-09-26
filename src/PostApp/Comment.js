import React from "react";
import { useGreeter } from "./useGreeter";

const CommentBlock = ({ comment }) => {
  useGreeter("Comment");

  const { email, body } = comment;

  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" style={{ fontWeight: "bold" }}>
          {email}
        </h5>
        <p class="card-text">{body}</p>
      </div>
    </div>
  );
};

export default CommentBlock;
