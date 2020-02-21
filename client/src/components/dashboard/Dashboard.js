import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { createPassword } from '../../actions/authActions';
import { getFiles } from '../../actions/fileActions';
import TrackList from '../tracks/TrackList';
import '../../App.scss';
import './Dashboard.scss';

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const { auth, files, authErrors, authLoading } = useSelector(state => ({
    auth: state.auth,
    authErrors: state.auth.errors,
    authLoading: state.auth.loading,
    files: state.files.files
  }));

  const { user, isAuthenticated } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  const handleChangePassword = e => setPassword(e.target.value);

  const handleSubmit = () => {
    dispatch(createPassword(password, user));
  };

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <h3 className="">Dashboard</h3>
          <h6 className="subtitle">Welcome, {user.name}</h6>
        </div>
        <div className="row">
          <p className="col s6">
            Set a new password for member access
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
          <div className="col s6">
            <button type="submit" className="btn btn-custom" style={{ width: '100%' }} onClick={handleSubmit}>
              {authLoading ? 'Saving...' : 'Enter'}
            </button>
          </div>
        </div>
      </div>

      <div className="row dashboard-container">
        <div className="col s12">
          <h5 className="left-align">Tracks</h5>
          <TrackList files={files} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
