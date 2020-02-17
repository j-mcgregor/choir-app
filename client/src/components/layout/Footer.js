import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <p className="grey-text text-lighten-4">
              Created by{' '}
              <a
                href="http://www.jackjwmcgregor.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jack McGregor
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">© 2020 All Saints Community Choir</div>
      </div>
    </footer>
  );
};

export default Footer;
