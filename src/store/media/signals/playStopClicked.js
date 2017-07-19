import {set, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import startPlaying from '../sequences/startPlaying' 
import stopPlaying from '../sequences/stopPlaying' 


export default [
    set(state`media.currentMetadata`, null),
    when(state`media.isPlaying`), {
        true: [
            stopPlaying
        ],
        false: [
            startPlaying
        ]
    }
]