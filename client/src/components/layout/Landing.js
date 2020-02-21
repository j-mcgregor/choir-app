import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { checkPassword } from '../../actions/authActions';

import './Landing.scss';

const Landing = () => {
  const { authErrors } = useSelector(state => ({
    authErrors: state.auth.errors
  }));

  const [password, setPassword] = useState('');

  const handleChangePassword = e => setPassword(e.target.value);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(checkPassword(password));
  };

  const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';

  return (
    <div className="container-fluid purple lighten-5 center" style={{ minHeight: '80vh' }}>
      <div className="row">
        <div className="col m6 push-m3 s12">
          <div className="row">
            <h4 className="col m12">
              Welcome to <br /> All Saints Community Choir!
            </h4>
            <p className="col m6 push-m3 s12">
              Here you can download your practice tracks. Just click on your voice part and you'll see all the tracks
            </p>
            {isUserAuthenticated ? (
              <div className="col m8 push-m2 s12">
                {' '}
                <h2>Success!</h2>
              </div>
            ) : (
              <div className="col m8 push-m2 s12">
                <div className="row">
                  <p className="col m12">
                    Just enter the password to get started:
                    <input
                      onChange={handleChangePassword}
                      value={password}
                      error={authErrors.password}
                      id="password"
                      type="password"
                      className={classnames('', {
                        invalid: authErrors.password
                      })}
                    />
                    <span className="red-text">{authErrors.password}</span>
                  </p>
                </div>
                <div className="row">
                  <div className="col m12">
                    <button type="submit" className="btn btn-custom" style={{ width: '100%' }} onClick={handleSubmit}>
                      Enter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
