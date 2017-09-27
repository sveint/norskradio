import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import startPlaying from '../sequences/startPlaying'
import saveLastPlayed from '../../channels/actions/saveLastPlayed'

export default [
    set(state`media.current`, state`channels.channels.${props`channel`}`),
    startPlaying,
    saveLastPlayed
]