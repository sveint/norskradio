import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import getChannels from '../actions/getChannels'
import loadLastPlayed from '../actions/loadLastPlayed'

export default [
	getChannels, {
		success: [
			set(state`channels.channels`, props`result`),
			loadLastPlayed
		]
	}
]