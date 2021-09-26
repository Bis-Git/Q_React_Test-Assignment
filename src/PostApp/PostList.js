import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGreeter } from "./useGreeter";
import Post from "./Post";
import Loading from "./Loading";

const posts_url = "https://jsonplaceholder.typicode.com/posts";
const users_url = "https://jsonplaceholder.typicode.com/users/";

const PostList = () => {
  useGreeter("PostList");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [users, setUsers] = useState();

  const getPosts = useCallback(async () => {
    const posts_response = await fetch(posts_url);
    const posts = await posts_response.json();

    const users_response = await fetch(users_url);
    const users = await users_response.json();

    setPosts(posts);
    setUsers(users);
    setSearchedPosts(posts);

    console.log(users);

    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value) {
      const newPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedPosts(newPosts);
    } else {
      setSearchedPosts(posts);
    }
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row my-2">
            <div className="col-sm-6">
              <h1 className="text-center">Posts</h1>
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                onChange={handleSearch}
              />
            </div>
            {searchedPosts.map((post) => {
              return (
                <div key={post.id} className="col-sm-6 my-2">
                  <Link
                    to={`/post/${post.id}`}
                    target="_blank"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <Post
                      post={post}
                      user={users.filter((user) => user.id === post.userId)}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default PostList;
