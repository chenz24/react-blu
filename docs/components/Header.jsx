import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-head">
          <div className="container">
            <nav className="nav">
              <div className="nav-left">
                <a href="#" className="nav-item is-brand">React-Blu</a>
              </div>
              <div className="nav-right">
                <span className="nav-item">
                  <a href="https://github.com/chenz24/react-blu" target="_blank" className="button is-light is-outlined">
                    <span className="icon"><i className="fa fa-github"></i></span> <span>GitHub</span>
                  </a>
                </span>
              </div>
            </nav>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
