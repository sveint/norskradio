import channelClicked from './signals/channelClicked'
import playStopClicked from './signals/playStopClicked'
import mediaStatusChanged from './signals/mediaStatusChanged'
import metadataChanged from './signals/metadataChanged'

export default {
  state: {
    isPlaying: false,
    isError: false,
    isBuffering: false,
    current: null,
    currentMetadata: null
  },
  signals: {
    channelClicked,
    playStopClicked,
    mediaStatusChanged,
    metadataChanged
  }
}