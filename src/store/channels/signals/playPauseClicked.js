import {set, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import playCurrent from '../actions/playCurrent' 
import pauseCurrent from '../actions/pauseCurrent' 

export default [
    when(state`app.media.isPlaying`), {
        true: [
            pauseCurrent
        ],
        false: [
            playCurrent
        ]
    }
]