import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faFolderOpen, faSignOutAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../actions/authActions';
import './Navbar.scss';
import M from 'materialize-css';
import genKey from '../../utils/genKey';

class Navbar extends Component {
  logoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    const el = document.getElementById('dropdown-trigger');
    M.Dropdown.init(el, { constrainWidth: false });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li>
          <Link to="/upload">
            <FontAwesomeIcon icon={faUpload} />
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faFolderOpen} />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={this.logoutHandler}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </li>
      </Fragment>
    );

    const trackRoutes = ['all', 'alto', 'bass', 'recordings', 'soprano', 'tenor'].map((track, i) => (
      <li key={genKey(track, i)}>
        <Link to={`/tracks/${track}`} style={{ textTransform: 'capitalize' }}>
          {track}
        </Link>
      </li>
    ));

    return (
      <div className="navbar-fixed">
        <nav className="">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo left">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <ul id="nav-mobile" className="right">
              {trackRoutes}
              {isAuthenticated && authLinks}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
