import {set, equals, debounce} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import playCurrent from '../actions/playCurrent' 
import pauseCurrent from '../actions/pauseCurrent' 

const stopStatusSequence = [
    set(state`app.media.isPlaying`, false),
    set(state`app.media.isBuffering`, false),
    set(state`app.media.isError`, false)
]

export default [
    debounce(100), {
        continue: [
            equals(props`status`), {
                PLAYING: [
                    set(state`app.media.isPlaying`, true),
                    set(state`app.media.isBuffering`, false),
                    set(state`app.media.isError`, false)
                ],
                PAUSED: stopStatusSequence,
                STOPPED: stopStatusSequence,
                FINISHED: stopStatusSequence,
                BUFFERING: [
                    set(state`app.media.isPlaying`, true),
                    set(state`app.media.isBuffering`, true),
                    set(state`app.media.isError`, false)
                ],
                ERROR: [
                    set(state`app.media.isPlaying`, false),
                    set(state`app.media.isBuffering`, false),
                    set(state`app.media.isError`, true)
                ]
            }
        ],
        discard: []
    }
]