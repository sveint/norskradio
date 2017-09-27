

export default async function saveLastPlayed({state, localStorage}) {
    const current = state.get('media.current')
    if (current) {
        localStorage.put('lastPlayed', current.name)
    }
}