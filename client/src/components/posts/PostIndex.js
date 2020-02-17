import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getPosts, deletePost } from '../../actions/postActions';
import Spinner from '../shared/Spinner';
import genKey from '../../utils/genKey';

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
    <div className="container index">
      <h4 className="left-align">
        Posts {posts && posts.length ? `: ${posts.length}` : ''}
      </h4>
      <table className="">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length ? (
            posts.map((p, i) => (
              <tr key={genKey(p.title, i)}>
                <td>
                  <Link to={`/posts/${p._id}`} className="card-title truncate">
                    {p.title}
                  </Link>
                </td>
                <td>
                  {isAuthenticated && (
                    <Fragment>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon delete"
                        onClick={() => handleDelete(p._id)}
                      />
                      <Link to={`/posts/${p._id}/edit`}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => console.log('click')}
                          className="icon edit"
                        />
                      </Link>
                    </Fragment>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr />
          )}
        </tbody>
      </table>

      {loading && <Spinner />}
    </div>
  );
};

export default PostsIndex;
