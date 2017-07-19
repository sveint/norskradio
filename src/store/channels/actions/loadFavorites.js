

export default async function loadFavorites({state, localStorage}) {	
    try {
        let favorites = await localStorage.get('favorites')
        if (favorites) {
            state.set('channels.favorites', JSON.parse(favorites))
        }
    }
    catch(error) {
        console.error(error)
    }
}