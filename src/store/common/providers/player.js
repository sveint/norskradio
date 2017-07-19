import RNMusicStreamer from 'react-native-music-streamer';
console.log(RNMusicStreamer)
export default function Player(context) {
    context.player = {
        pause: () => RNMusicStreamer.pause(),
        resume: () => RNMusicStreamer.resume(),
        play: (url, metadata) => {
            RNMusicStreamer.prepare(url, metadata)
            RNMusicStreamer.play()
        },
        stop: () => RNMusicStreamer.stop(),
        getCurrentUrl: () => RNMusicStreamer.getCurrentUrl()
    }

    return context
}