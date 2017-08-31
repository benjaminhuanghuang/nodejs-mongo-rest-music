import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">UpStar Music</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link  to={`/artists/${this.state.id}`} onClick={this.setLink.bind(this)}>
                    Random Artist
                  </Link>
                </li>
                <li> 
                  <Link to={'/artists/new'}>Create Artist</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;
