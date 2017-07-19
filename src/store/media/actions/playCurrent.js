

export default function startCurrent({player, state, props}) {	
    const currentChannel = state.get('media.current')
    if (currentChannel) {
        player.stop()
        player.play(
            currentChannel.url,
            {
                title: currentChannel.name,
                album: currentChannel.name,
                artist: currentChannel.name,
                artwork: currentChannel.logoUrl,
                metadataFromStream: true
            }
        )
        
    }
}