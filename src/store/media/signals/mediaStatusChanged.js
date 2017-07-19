import {set, equals, debounce} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'


const stopStatusSequence = [
    set(state`media.isPlaying`, false),
    set(state`media.isBuffering`, false),
]

export default [
    debounce(100), {
        continue: [
            equals(props`status`), {
                PLAYING: [
                    set(state`media.isPlaying`, true),
                    set(state`media.isBuffering`, false),
                    set(state`media.isError`, false)
                ],
                PAUSED: [
                    stopStatusSequence,
                    set(state`media.isError`, false),
                ],
                STOPPED: stopStatusSequence,
                FINISHED: [
                    stopStatusSequence,
                    set(state`media.isError`, false)
                ],
                BUFFERING: [
                    set(state`media.isPlaying`, true),
                    set(state`media.isBuffering`, true),
                    set(state`media.isError`, false)
                ],
                ERROR: [
                    set(state`media.isPlaying`, false),
                    set(state`media.isBuffering`, false),
                    set(state`media.isError`, true)
                ]
            }
        ],
        discard: []
    }
]