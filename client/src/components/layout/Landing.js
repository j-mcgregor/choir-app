import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/fileActions';
import { getPosts } from '../../actions/postActions';

import TrackList from '../tracks/TrackList';
import PostList from '../posts/PostList';
import './Landing.scss';

const Landing = () => {
  const { files, posts, auth } = useSelector(state => ({
    files: state.files.files,
    posts: state.posts,
    auth: state.auth
  }));

  const dispatch = useDispatch();

  const { isAuthenticated } = auth;

  useEffect(() => {
    dispatch(getFiles());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <div className="container-fluid purple lighten-5">
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
      <div className="container-fluid">
        <div className="row">
          <div className="col s8">
            <TrackList files={files} isAuthenticated={isAuthenticated} />
          </div>
          <div className="col s4">
            <PostList posts={posts} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
