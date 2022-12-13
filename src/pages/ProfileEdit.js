import React from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const resposta = await getUser();
        const { name, email, image, description } = resposta;
        this.setState({
          loading: false,
          name,
          email,
          description,
          image,
        });
      },
    );
  }

  onInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value }, () => {
      const { name, email, description, image } = this.state;
      const isValid = [name, email, description, image]
        .some((item) => item.length === 0);
      this.setState({ isDisabled: isValid });
    });
  };

  handleClick = () => {
    this.setState(
      { loading: true },
      async () => {
        const { name, email, description, image } = this.state;
        await updateUser({ name, email, description, image });
        this.setState({
          loading: false,
        });
        const { history } = this.props;
        history.push('/12-Project-TrybeTunes/profile');
      },
    );
  };

  render() {
    const { loading, name, email, description, image, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form className="profileForm">
            { image === ''
              ? <FaUserCircle />
              : <img data-testid="profile-image" src={ image } alt={ name } />}
            <label htmlFor="image">
              Imagem:
              <input
                data-testid="edit-input-image"
                type="text"
                value={ image }
                id="image"
                onChange={ this.onInputChange }
                placeholder="Insira uma url"
              />
            </label>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                type="text"
                id="name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="edit-input-email"
                type="email"
                value={ email }
                id="email"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                data-testid="edit-input-description"
                type="text"
                value={ description }
                id="description"
                onChange={ this.onInputChange }
                cols="30"
                rows="4"
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Salvar

            </button>
          </form>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
