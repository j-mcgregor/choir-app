import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TrackList from './TrackList';
import { useDispatch } from 'react-redux';
import { deleteFile, getFiles } from '../../actions/fileActions';

const TrackPage = ({ files = [], isAuthenticated, type }) => {
  const trackFilter = track => {
    return track.metadata.trackType === type;
  };
  const filtered = files.filter(trackFilter);
  return (
    <div className="container" style={{ padding: '3rem 0', minHeight: '80vh' }}>
      <h4 style={{ textTransform: 'capitalize' }}>{type.toLowerCase()} Tracks</h4>
      <TrackList files={filtered} isAuthenticated={isAuthenticated} />
    </div>
  );
};

const TracksContainer = props => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const pageProps = {
    isAuthenticated: props.auth.isAuthenticated,
    files: props.files.files
  };

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <Switch>
      <Route exact path={`${path}/alto`} component={() => <TrackPage {...pageProps} type="ALTO" />} />
      <Route exact path={`${path}/bass`} component={() => <TrackPage {...pageProps} type="BASS" />} />
      <Route exact path={`${path}/soprano`} component={() => <TrackPage {...pageProps} type="SOPRANO" />} />
      <Route exact path={`${path}/tenor`} component={() => <TrackPage {...pageProps} type="TENOR" />} />
      <Route exact path={`${path}/all`} component={() => <TrackPage {...pageProps} type="ALL" />} />
      <Route exact path={`${path}/recordings`} component={() => <TrackPage {...pageProps} type="RECORDINGS" />} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  files: state.files
});

export default connect(mapStateToProps)(TracksContainer);
