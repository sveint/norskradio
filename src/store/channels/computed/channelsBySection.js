

import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(
    state`channels.channels`,
    state`channels.favorites`,
    (channels, favorites) => {

      if (Object.keys(channels).length === 0) {
        return []
      }

      const channelsByRegions = {}
      for (let c of Object.values(channels)) {
        if (!(c.region in channelsByRegions)) {
          channelsByRegions[c.region] = []
        }
        channelsByRegions[c.region].push(c.name)
      }
      
      const sortedRegions = Object.keys(channelsByRegions).sort()
      
      // Move 'Nasjonal' to top
      const priorityRegionIdx = sortedRegions.indexOf('Nasjonal')
      if (priorityRegionIdx >= 0) {
        sortedRegions.splice(priorityRegionIdx, 1)
        sortedRegions.unshift('Nasjonal')
      }

      // Add favorites on top
      sortedRegions.unshift('Favoritter')
      channelsByRegions['Favoritter'] = favorites.slice()

      return sortedRegions.map(r => {
        // Sort channels by name
        channelsByRegions[r].sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        })
        return {
          title: r,
          data: channelsByRegions[r]
        }
      })
  }
)