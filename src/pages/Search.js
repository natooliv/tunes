import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../styles/search.scss';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameSearched: '',
      searchInput: '',
      loading: false,
      apiRequest: [],
      requestSearch: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showAlbum = this.showAlbum.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { searchInput } = this.state;

    this.setState({
      loading: true,
      nameSearched: searchInput,
    });
    const apiRequest = await searchAlbumsAPIs(searchInput);
    this.setState({
      apiRequest,
      searchInput: '',
      loading: false,
      requestSearch: true,
    });
  }

  showAlbum() {
    const { apiRequest, nameSearched } = this.state;

    return apiRequest.length === 0 ? <p>Nenhum álbum foi encontrado</p>
      : (
        <div className="search-result">
          <p className="result-text">{`Resultado de álbuns de: ${nameSearched}`}</p>
          <div className="album-miniature-div">
            {apiRequest.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                className="album-miniature-link"
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <div className="album-miniature">
                  <div className="album-image">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </div>
                  <div className="album-artist-info">
                    <p>{album.collectionName}</p>
                    <p>{album.artistName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>);
  }

  render() {
    const { searchInput, loading, requestSearch } = this.state;
    const minLetters = 2;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form className="search-form">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="Nome do Artista"
              value={ searchInput }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              id="btn-search-form"
              data-testid="search-artist-button"
              disabled={ searchInput.length < minLetters }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}

        { requestSearch ? this.showAlbum() : null }

      </div>

    );
  }
}
//
export default Search;
