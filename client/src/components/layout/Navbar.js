import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faFolderOpen,
  faSignOutAlt,
  faPlus,
  faCaretDown,
  faCommentAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../actions/authActions';
import './Navbar.scss';
import M from 'materialize-css';

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

    return (
      <div className="navbar-fixed">
        <nav className="">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo left">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <ul id="dropdown1" className="dropdown-content">
              <li>
                <Link to="/posts">
                  <FontAwesomeIcon icon={faCommentAlt} className="mr-1" />
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/posts/new">
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  New Post
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/members">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    Members
                  </Link>
                </li>
                {/* <li>
                  <a
                    className="dropdown-trigger"
                    id="dropdown-trigger"
                    href="#!"
                    data-target="dropdown1"
                  >
                    <FontAwesomeIcon icon={faCaretDown} className="mr-1" />
                    Posts
                  </a>
                </li> */}
                <li>
                  <Link to="/posts">
                    <FontAwesomeIcon icon={faCommentAlt} className="mr-1" />
                    Posts
                  </Link>
                </li>
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
