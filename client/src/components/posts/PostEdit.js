import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { updatePost, getPost } from '../../actions/postActions';
import './Form.scss';

const PostForm = props => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => ({
    posts: state.posts
  }));

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const { post, errors } = posts;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleOnChangeTitle = e => setTitle(e.target.value);
  const handleOnChangeBody = e => setBody(e.target.value);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const handleSubmit = e => {
    const updatedPost = { title, body };
    dispatch(updatePost(id, updatedPost, props.history));
  };

  const handleCancel = () => {
    setTitle(post.title);
    setBody(post.body);
  };

  return (
    <div className="container form-container">
      <div className="row">
        <div className="col s6 push-s3">
          <div className="row">
            <h5 className="col s12">Edit Post</h5>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Post title..."
                id="title"
                type="text"
                className={`validate ${
                  errors && errors.title ? 'invalid' : ''
                }`}
                value={title}
                onChange={handleOnChangeTitle}
                error={errors.title}
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="body"
                    className={`materialize-textarea ${
                      errors && errors.body ? 'invalid' : ''
                    }`}
                    onChange={handleOnChangeBody}
                    value={body}
                  ></textarea>
                  <label htmlFor="body">Body</label>
                </div>
              </div>
              <div className="row">
                <div className="col s7 push-s5">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light hoverable mr-1"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn waves-effect waves-light hoverable cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostForm);
