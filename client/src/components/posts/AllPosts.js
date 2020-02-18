import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../shared/Spinner';
import genKey from '../../utils/genKey';

export default function AllPosts({
  posts,
  isAuthenticated,
  loading,
  handleDelete
}) {
  return (
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
                <Link to={`/posts/${p._id}`} className="truncate">
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
          <tr>
            <td>{loading ? <Spinner /> : 'No posts'}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
