import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFiles } from '../../actions/fileActions';
import { getPosts, deletePost } from '../../actions/postActions';
import TrackList from '../tracks/TrackList';
import PostList from '../posts/PostList';
import '../../App.scss';
import './Dashboard.scss';

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
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deletePost(id));
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <h3 className="">Dashboard</h3>
          <h6 className="subtitle">Welcome, {user.name}</h6>
        </div>
      </div>

      <div className="row dashboard-container">
        <div className="col s12">
          <h5 className="left-align">Tracks</h5>
          <TrackList files={files} isAuthenticated={isAuthenticated} />
        </div>
      </div>
      <div className="row dashboard-container">
        <div className="col s12">
          <h5 className="left-align">Posts</h5>
          <PostList posts={posts} isAuthenticated={isAuthenticated} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
