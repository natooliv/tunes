import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      album: [],
      artAlbum: '',
      nameArtist: '',
      nameAlbum: '',
      favoriteMusics: [],
    };

    this.findMusics = this.findMusics.bind(this);
    this.saveFavoriteMusics = this.saveFavoriteMusics.bind(this);
    this.handleSong = this.handleSong.bind(this);
  }

  componentDidMount() {
    this.findMusics();
    this.saveFavoriteMusics();
  }

  async handleSong(track) {
    const { favoriteMusics } = this.state;
    this.setState({ loading: true });
    if (favoriteMusics.some(({ trackId }) => trackId === track.trackId)) {
      await removeSong(track);
      this.setState({ loading: true });
    } else {
      await addSong(track);
      this.setState({ loading: true });
    }
    await getFavoriteSongs().then((res) => this.setState(() => ({
      favoriteMusics: res,
    })));
    this.setState({ loading: false });
  }

  async saveFavoriteMusics() {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics });
  }

  async findMusics() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    if (musics !== undefined) {
      this.setState({
        album: musics,
        nameArtist: musics[0].artistName,
        nameAlbum: musics[0].collectionName,
        artAlbum: musics[0].artworkUrl100,
      });
    }
  }

  render() {
    const {
      album, artAlbum, nameAlbum, nameArtist, favoriteMusics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-container">
          <div className="album-info-container">
            <img src={ artAlbum } alt={ nameAlbum } />
            <p data-testid="album-name">{ nameAlbum }</p>
            <p data-testid="artist-name">{ nameArtist }</p>
          </div>
          { loading ? <Loading /> : (
            <div className="music-container">

              <p className="text-found-album">
                {`Musicas encontradas para o álbum ${nameAlbum}`}
              </p>
              {album.slice(1).map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  isFavorite={ favoriteMusics
                    .some((music) => music.trackId === track.trackId) }
                  favoriteSong={ () => this.handleSong(track) }
                />
              ))}
            </div>
          )}

        </div>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
