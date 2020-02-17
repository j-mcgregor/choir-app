import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/fileActions';
import { getPosts } from '../../actions/postActions';

import TrackList from '../tracks/TrackList';
import PostList from '../posts/PostList';
import './Landing.scss';

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
    <div>
      <div className="container-fluid banner">
        <div className="container">
          <div className="row">
            <h4 className="col m8">
              Welcome to <br /> All Saints Community Choir!
            </h4>
            <p className="col m8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              fugit quis nostrum nemo deserunt velit delectus asperiores laborum
              dolores iure quae eligendi voluptatibus, odio unde est id nisi
              consectetur tenetur.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col s10">
              <TrackList files={files} isAuthenticated={false} />
            </div>
            <div className="col s10">
              <PostList posts={posts} isAuthenticated={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
