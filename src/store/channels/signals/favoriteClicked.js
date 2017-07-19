import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import toggleFavorite from '../actions/toggleFavorite' 
import saveFavorites from '../actions/saveFavorites' 

export default [
    toggleFavorite,
    saveFavorites
]