
import channelsBySection from '../../channels/computed/channelsBySection'

export default function(next) {
    return function setNextPrevCurrent({state, resolve}) {	
        const favorites = state.get('channels.favorites')
        if (!favorites.length) {
            return
        }
        
        // Search for current channel in favorites 
        // If current is not in favorites, we set first favorite as current
        const current = state.get('media.current')
        let currentIdx = 0
        if (current) {
            let favoriteIdx = favorites.indexOf(current.name)
            if (favoriteIdx >= 0) {
                
                // Only skip if current channel is in favorites
                // (otherwise it should be 0)
                currentIdx = next ? favoriteIdx + 1 : favoriteIdx - 1
            
                // Wrap around if applicable
                if (currentIdx < 0) {
                    currentIdx = favorites.length - 1
                }
                else if (currentIdx >= favorites.length) {
                    currentIdx = 0
                }
            }
        }

        const channels = state.get('channels.channels')
        const newCurrent = Object.values(channels).find(c => c.name === favorites[currentIdx])
        state.set('media.current', newCurrent)
    }
}
