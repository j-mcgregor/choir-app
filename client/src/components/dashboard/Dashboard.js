import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFiles } from '../../actions/fileActions';
import { getPosts } from '../../actions/postActions';
import TrackList from '../tracks/TrackList';
import PostList from '../posts/PostList';

const Dashboard = () => {
  const { auth, files, posts } = useSelector(state => ({
    auth: state.auth,
    files: state.files.files,
    posts: state.posts
  }));

  const { user, isAuthenticated } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles());
    dispatch(getPosts());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h3 className="">Dashboard</h3>
        <h6 className="subtitle">Welcome, {user.name}</h6>
      </div>
      <div className="row">
        <div className="col s10">
          <TrackList files={files} isAuthenticated={isAuthenticated} />
        </div>
        <div className="col s10">
          <PostList posts={posts} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
