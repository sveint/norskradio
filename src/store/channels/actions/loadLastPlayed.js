

export default async function loadLastPlayed({state, localStorage}) {
    const lastPlayed = await localStorage.get('lastPlayed')
    const channels = state.get('channels.channels')
    if (lastPlayed && lastPlayed in channels) {
        state.set('media.current', channels[lastPlayed])
    }
}