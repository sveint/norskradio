import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import startPlaying from '../sequences/startPlaying' 

export default [
    set(state`media.current`, state`channels.channels.${props`channel`}`),
    startPlaying
]