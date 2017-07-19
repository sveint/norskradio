

export default function stopCurrent({player, state, props}) {	
    const currentChannel = state.get('media.current')
    player.stop()
}