import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faFolderOpen,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  logoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="navbar-fixed">
        <nav className="blue-grey">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo left">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            {isAuthenticated ? (
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/upload">
                    <FontAwesomeIcon icon={faUpload} className="mr-1" />
                    Upload
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={this.logoutHandler}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            )}
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
