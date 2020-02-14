import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/fileActions';
import { getPosts } from '../../actions/postActions';

import TrackList from '../tracks/TrackList';
import PostList from '../posts/PostList';

const Landing = () => {
  const { files, posts } = useSelector(state => ({
    files: state.files.files,
    posts: state.posts
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        <h3 className="">Welcome to the All Saints Choir noticeboard!</h3>
      </div>
      <div className="row">
        <div className="col s10">
          <TrackList files={files} isAuthenticated={false} />
        </div>
        <div className="col s10">
          <PostList posts={posts} isAuthenticated={false} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
