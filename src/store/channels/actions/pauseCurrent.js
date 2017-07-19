

export default function pauseCurrent({player, musicControl, state, props}) {	
    const currentChannel = state.get('channels.current')
    player.stop()        
    if (currentChannel) {
        musicControl.setNowPlaying({
            title: currentChannel.name,
            artwork: currentChannel.urlLogo, // URL or RN's image require()
            artist: currentChannel.name,
            album: currentChannel.name,
            color: 0xFFFFFF, // Notification Color - Android Only
        })
        musicControl.enableControl('play', true)
    }
}