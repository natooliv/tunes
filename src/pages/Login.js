import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      name: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      name: target.value }, () => {
      const MIN_CHARACTERS = 3;
      const isValid = target.value.length < MIN_CHARACTERS;
      this.setState({ isDisabled: isValid });
    });
  };

  handleClick = () => {
    this.setState(
      { loading: true },
      async () => {
        const { name } = this.state;
        await createUser({ name });
        this.setState({
          loading: false,
        });
        const { history } = this.props;
        history.push('/search');
      },
    );
  };

  render() {
    const { isDisabled, name, loading } = this.state;
    if (loading) return <Loading />;
    return (

      <div data-testid="page-login" className="mainLogin">
        <img src={ TrybeTunesLogin } alt="TrybeTunesLogo" />
        <form>
          <input
            type="text"
            placeholder="Nome:"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
            value={ name }
          />
          <button
            type="submit"
            className="btn btn-dark submit mt-2"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
