import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

import genKey from '../../utils/genKey';
import { getFiles } from '../../actions/fileActions';
import { getPosts } from '../../actions/postActions';

const Dashboard = () => {
  const { auth, files, posts } = useSelector(state => ({
    auth: state.auth,
    files: state.files.files,
    posts: state.posts
  }));

  console.log(posts);

  const { user } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles());
    dispatch(getPosts());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h3 className="">Dashboard</h3>
        <h6 className="">Welcome, {user.name}</h6>
      </div>
      <div className="row">
        <div className="col s10">
          <h4 className="left-align">Tracks</h4>
          {files && files.length
            ? files.map((f, i) => {
                return (
                  <div className="player-container" key={genKey(f.filename, i)}>
                    <div className="row">
                      <div className="col s9">
                        <label>{f.filename}</label>
                      </div>
                      <div className="col s3"></div>
                    </div>
                    <div className="row">
                      <div className="col s8 player">
                        <ReactPlayer
                          url={`/api/files/download/${f._id}`}
                          controls
                          height="40px"
                          width="100%"
                          style={{ marginBottom: '10px' }}
                        />
                      </div>
                      <div className="col s3">
                        <button className="btn-floating mr-sm">
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                        <button className="btn-floating mr-sm red accent-2">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : ''}
        </div>
        <div className="col s10">
          <h4 className="left-align">Posts</h4>
          <div className="collection post-collection">
            {posts && posts.posts.length ? (
              posts.posts.map((p, i) => (
                <Link
                  to={`/posts/${p.id}`}
                  key={genKey(p.title, i)}
                  className="collection-item truncate"
                >
                  {p.title}
                </Link>
              ))
            ) : (
              <div className="spinner-container">
                <div className="spinner" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
