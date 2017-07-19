import {parallel} from 'cerebral'
import loadChannels from '../../channels/signals/loadChannels' 
import loadFavorites from '../../channels/actions/loadFavorites' 
import setPlayerCurrent from '../../media/actions/setPlayerCurrent' 

export default [
    parallel([
        loadChannels,
        loadFavorites,
        setPlayerCurrent
    ])
]