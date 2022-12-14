import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      artist: '',
      loading: false,
      albums: [],
      searchArtist: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      artist: target.value }, () => {
      const MIN_CHARACTERS = 2;
      const isValid = target.value.length < MIN_CHARACTERS;
      this.setState({ isDisabled: isValid });
    });
  };

  handleSearchButton = () => {
    const { artist } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const resposta = await searchAlbumsAPI(artist);
        this.setState({
          albums: [...resposta],
          loading: false,
          searchArtist: artist,
          artist: '',
        });
      },
    );
  };

  searchResult = () => {
    const { albums, searchArtist } = this.state;
    if (searchArtist !== '') {
      return (
        <div>
          <span className="searchResult">
            {albums.length !== 0
              ? `Resultado de álbuns de:
            ${searchArtist}` : 'Nenhum álbum foi encontrado'}
          </span>
          <ul className="albumSearch">
            {albums.map((album, index) => (
              <Link
                key={ index }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <li>
                  <img
                    src={ album.artworkUrl100.replace('100x100bb', '1000x1000bb') }
                    alt={ album.collectionName }
                  />
                  <span>{album.collectionName}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>);
    }
  };

  render() {
    const { isDisabled, artist, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search">
          <label htmlFor="artist">
            <input
              data-testid="search-artist-input"
              type="text"
              value={ artist }
              onChange={ this.onInputChange }
              placeholder="Nome do artista/banda"
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleSearchButton }
          >
            Pesquisar

          </button>
        </div>
        <span>
          {loading ? <Loading /> : this.searchResult()}
        </span>
      </div>
    );
  }
}

export default Search;
