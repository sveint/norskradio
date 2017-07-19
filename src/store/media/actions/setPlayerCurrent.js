

export default async function setPlayerCurrent({player, state}) {	
    try {
        let currentUrl = await player.getCurrentUrl();
        console.log(currentUrl)
        if (currentUrl) {
            let channels = state.get('channels.channels')
            let current = Object.values(channels).find(c => c.url === currentUrl)
            if (current) {
                state.set('media.current', current)
            }
        }
    }
    catch(err) {
        console.error(err)
        state.set('media.current', null)
    }
}