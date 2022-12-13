import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userInformation: undefined,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getUser();
        this.setState({
          loading: false,
          userInformation: resposta,
        });
      },
    );
  }

  information = () => {
    const { userInformation } = this.state;
    if (userInformation !== undefined) {
      const { name, email, image, description } = userInformation;
      return (
        <div className="profile">
          { image === ''
            ? <FaUserCircle />
            : <img data-testid="profile-image" src={ image } alt={ name } />}
          <span>Nome:</span>
          <p>{name}</p>
          <span>E-mail:</span>
          <p>{email}</p>
          <span>Descrição:</span>
          <p>{description}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      );
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : this.information()}
      </div>
    );
  }
}

export default Profile;
