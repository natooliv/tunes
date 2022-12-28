import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import TrybeTunesLogin from '../TrybeTunesLogin.png';

import '../styles/header.scss';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loadingPage: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loadingPage: true,
    }, async () => {
      const userName = await getUser();
      this.setState({
        name: userName.name,
        loadingPage: false,
      });
    });
  }

  render() {
    const { name, loadingPage } = this.state;
    return (
      <header data-testid="header-component" className="mainHeader">
        <div className="header-info">
          <img src={ TrybeTunesLogin } alt="TrybeTunesLogin" />
          { loadingPage ? <Loading />
            : (
              <h1 data-testid="header-user-name">{ name }</h1>
            ) }
        </div>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
