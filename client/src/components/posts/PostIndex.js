import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import { getPosts, deletePost } from '../../actions/postActions';
import AllPosts from './AllPosts';
import './Post.scss';

const PostsIndex = () => {
  const { posts: postList, auth } = useSelector(state => ({
    posts: state.posts,
    auth: state.auth
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deletePost(id));
    window.location.reload();
  };

  const { isAuthenticated } = auth;
  const { posts, loading } = postList;

  return (
    <div className="container-fluid index">
      <div className="row">
        <div className="col m6 v-divider">
          <div className="row">
            <div className="col m8 offset-m2">
              <PostForm />
            </div>
          </div>
        </div>
        <div className="col m6">
          <div className="row">
            <div className="col m8 offset-m2">
              <AllPosts
                posts={posts}
                isAuthenticated={isAuthenticated}
                loading={loading}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsIndex;
