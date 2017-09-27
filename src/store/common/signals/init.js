import {parallel} from 'cerebral'
import loadChannels from '../../channels/signals/loadChannels'
import loadFavorites from '../../channels/actions/loadFavorites'

export default [
    parallel([
        loadChannels,
        loadFavorites
    ])
]