

export default function startCurrent({player, musicControl, state, props}) {	
    const currentChannel = state.get('channels.current')
    if (currentChannel) {
        player.stop()
        player.play(currentChannel.url)
        
        musicControl.enableBackgroundMode(true)
        musicControl.setNowPlaying({
            title: currentChannel.name,
            artwork: currentChannel.urlLogo, // URL or RN's image require()
            artist: currentChannel.name,
            album: currentChannel.name,
            color: 0xFFFFFF, // Notification Color - Android Only
        })
        musicControl.enableControl('pause', true)
    }
}