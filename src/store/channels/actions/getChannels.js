

function postprocessing(data) {
	let result = {}
	for (let item of data) {
		item.logoUrl = `https://sveint.github.io/norskradio/resources/logos/${item.logo}.png`
		result[item.name] = item
	}
	return result
}

export default async function getChannels({http, localStorage, path}) {
	try {
		try {
			// Update once per day
			const value = await localStorage.get('channelList', 24 * 60 * 60)
			if (value !== null){
				let data = postprocessing(JSON.parse(value))
				return path.success({result: data})
			}
		} catch (error) {
			console.error(error)
			// Caching isn't critical -> just fall through
		}
		let response = await http.get('https://sveint.github.io/norskradio/resources/channels.json')
		try {
			localStorage.put('channelList', JSON.stringify(response.result))
		}
		catch (error) {
			console.error(error)
			// Caching isn't critical -> just fall through
		}
		response.result = postprocessing(response.result)
		return path.success(response)
	}
	catch(err) {
		return path.error(response)
	}
}