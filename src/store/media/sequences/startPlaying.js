import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import playCurrent from '../actions/playCurrent' 

export default [
    playCurrent,
    set(state`media.currentMetadata`, null)
]