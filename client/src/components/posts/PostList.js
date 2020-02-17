import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../shared/Spinner';
import genKey from '../../utils/genKey';

const PostList = ({ posts, isAuthenticated }) => {
  return (
    <div>
      <h4 className="left-align">
        Posts {posts && posts.posts.length ? `: ${posts.posts.length}` : ''}
      </h4>
      <div className="collection post-collection">
        {posts && posts.posts.length ? (
          posts.posts.map((p, i) => (
            <div key={genKey(p.title, i)} className="collection-item row">
              <div className="col s10">
                <Link to={`/posts/${p._id}`} className="truncate">
                  {p.title}
                </Link>
              </div>
              <div className="col s1">
                {isAuthenticated && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="icon"
                    onClick={() => console.log('click')}
                  />
                )}
              </div>
              <div className="col s1">
                {isAuthenticated && (
                  <Link to={`/posts/${p._id}/edit`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => console.log('click')}
                    />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default PostList;
