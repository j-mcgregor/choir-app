import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../shared/Spinner';
import './Post.scss';

const PostShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => ({
    posts: state.posts
  }));

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const { post, loading } = posts;

  return (
    <div className="container show">
      {post && (
        <div className="row">
          <div className="col s8">
            <h3 className="title">{post.title ? post.title : ''}</h3>
          </div>
          <div className="col s8">
            <p>{post.body ? post.body : ''}</p>
          </div>
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default PostShow;
