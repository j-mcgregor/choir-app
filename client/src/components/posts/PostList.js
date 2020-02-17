import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../shared/Spinner';
import genKey from '../../utils/genKey';

const PostList = ({ posts, isAuthenticated, handleDelete }) => {
  return (
    <div>
      <h4 className="left-align">
        Posts {posts && posts.posts.length ? `: ${posts.posts.length}` : ''}
      </h4>
      <div>
        <table className="striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.loading ? (
              <tr>
                <td colSpan="2">
                  <Spinner />
                </td>
              </tr>
            ) : posts.posts.length ? (
              posts.posts.map((p, i) => (
                <tr key={genKey(p.title, i)}>
                  <td>
                    <Link to={`/posts/${p._id}`} className="truncate">
                      {p.title}
                    </Link>
                  </td>
                  <td>
                    {isAuthenticated && (
                      <Fragment>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon"
                          onClick={() => handleDelete(p._id)}
                        />
                        <Link to={`/posts/${p._id}/edit`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Fragment>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No posts</td>
              </tr>
            )}
            {/* {posts && posts.posts.length ? (
              posts.posts.map((p, i) => (
                <tr key={genKey(p.title, i)}>
                  <td>
                    <Link to={`/posts/${p._id}`} className="truncate">
                      {p.title}
                    </Link>
                  </td>
                  <td>
                    {isAuthenticated && (
                      <Fragment>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon"
                          onClick={() => handleDelete(p._id)}
                        />
                        <Link to={`/posts/${p._id}/edit`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </Fragment>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <Spinner />
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;
