import {toggle} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
    toggle(state`app.expandedControls`)
]