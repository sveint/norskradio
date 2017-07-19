import {compute} from 'cerebral'
import {state, props} from 'cerebral/tags'

export default function isFavorite(nameStateOrProps) {
  return compute(
    nameStateOrProps,
    state`channels.favorites`,
    (name, favorites) => {
      return favorites.includes(name)
    }
  )
}