

export default function toggleFavorite({state, props}) {	
    let idx = state.get('channels.favorites').indexOf(props.name)
    if (idx >= 0) {
        state.splice('channels.favorites', idx, 1)
    }
    else {
        console.log(props.name)
        state.push('channels.favorites', props.name)
    }
}