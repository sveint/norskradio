

export default async function saveFavorites({state, localStorage}) {
    localStorage.put('favorites', JSON.stringify(state.get('channels.favorites')))
}