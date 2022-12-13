import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteMusics: [],
      loading: false,
    };

    this.saveFavoriteMusics = this.saveFavoriteMusics.bind(this);
    this.handleSong = this.handleSong.bind(this);
  }

  componentDidMount() {
    this.saveFavoriteMusics();
  }

  async handleSong(track) {
    this.setState({ loading: true });
    await removeSong(track);
    this.setState({ loading: true });

    await this.saveFavoriteMusics();
    this.setState({ loading: false });
  }

  async saveFavoriteMusics() {
    this.setState({ loading: true });

    await getFavoriteSongs().then((res) => this.setState({ favoriteMusics: res }));

    this.setState({ loading: false });
  }

  render() {
    const { favoriteMusics, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : null}
        <p className="fav-music-title">Músicas favoritas</p>
        {favoriteMusics.map((track) => (
          <MusicCard
            key={ track.trackId }
            track={ track }
            isFavorite={ favoriteMusics.some((music) => music.trackId === track.trackId) }
            favoriteSong={ () => this.handleSong(track) }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
