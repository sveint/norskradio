import loadChannels from './signals/loadChannels'
import favoriteClicked from './signals/favoriteClicked'

export default {
  state: {
    channels: {},
    favorites: [],
  },
  signals: {
    loadChannels,
    favoriteClicked,
  }
}