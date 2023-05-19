import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

class Navbar extends React.Component {
  state = {
    loggedIn: false,
    userName: '',
  };

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      this.setState({ loggedIn: true, userName: currentUser.username });
    }
  }

  render() {
    const { loggedIn, userName } = this.state;

    return (
      <nav>
        {loggedIn ? (
          <div className="dropdown">
            <button className="dropbtn">Olá {userName}!!
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/createhunt" className='navbar-link'>
                <a>Create New Hunt</a>
              </Link>
              <Link to="/myhunts" className='navbar-link'>
                <a>My Hunts</a>
              </Link>
              <Link to="/savedhunts" className='navbar-link'>
                <a>Saved Hunts</a>
              </Link>
              <LogoutButton/>
            </div>
          </div>
        ) : (
          <div>
            <a href="/login">Login</a>
            <a href="/cadastro">Register</a>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
