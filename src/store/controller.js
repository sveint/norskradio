import {Controller} from 'cerebral'
import HttpProvider from '@cerebral/http'

import Devtools from 'cerebral/devtools'
import init from './common/signals/init'
import appModule from './app'
import channelsModule from './channels'
import mediaModule from './media'
import playerProvider from './common/providers/player'
import intervalProvider from './common/providers/interval'
import localStorageProvider from './common/providers/localStorage'

console.log(process.env.DEVTOOLS_HOST)
const controller = Controller({
  devtools: (
    process.env.DEVTOOLS_HOST ?
      Devtools({
        host: process.env.DEVTOOLS_HOST,
        reconnect: false
      })
      :
      null
  ),
  state: {},
  signals: {
    init
  },
  modules: {
    app: appModule,
    channels: channelsModule,
    media: mediaModule
  },
  providers: [
    localStorageProvider,
    playerProvider,
    intervalProvider,
    HttpProvider({
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
    })
  ]
})

export default controller