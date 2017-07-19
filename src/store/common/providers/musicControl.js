import MusicControl from 'react-native-music-control';

const STATES = [
    'STATE_ERROR',
    'STATE_STOPPED',
    'STATE_PLAYING',
    'STATE_PAUSED',
    'STATE_BUFFERING'
]

export default function MusicControlProvider(context) {
    context.musicControl = MusicControl
    for (let s of STATES) {
        context.musicControl[s] = MusicControl[s]
    }

    return context
}