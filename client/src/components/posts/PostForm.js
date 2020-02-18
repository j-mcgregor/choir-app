import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/postActions';
import './Form.scss';

const PostForm = props => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const { posts } = useSelector(state => ({
    posts: state.posts
  }));

  const handleOnChangeTitle = e => setTitle(e.target.value);
  const handleOnChangeBody = e => setBody(e.target.value);

  const handleSubmit = e => {
    const newPost = { title, body };
    dispatch(createPost(newPost, props.history));
    window.location.reload();
  };

  const { errors } = posts;

  return (
    <div>
      <div className="row">
        <h5 className="col s12">New Post</h5>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Post title..."
            id="title"
            type="text"
            className={`validate ${errors && errors.title ? 'invalid' : ''}`}
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
            <div className="col s2 push-s10">
              <button
                type="submit"
                className="btn waves-effect waves-light hoverable"
                onClick={handleSubmit}
              >
                Create!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostForm);
