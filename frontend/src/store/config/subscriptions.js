import store from '../createStore';

const configureSubscriptions = () => {
  store.subscribe(() => {
    const favourites = store.getState().favourites;
    const playlists = store.getState().playlists;
    const favouritesData = { ...favourites };
    const playlistsData = { ...playlists };

    delete favouritesData.loaded;
    delete playlistsData.loaded;
    delete playlistsData.addingStart;
    delete playlistsData.song;

    const data = {
      favourites: favouritesData,
      playlists: playlistsData,
    };

    try {
      localStorage.setItem('data', JSON.stringify(data));
    } catch (e) {}
  });
};

export default configureSubscriptions;
