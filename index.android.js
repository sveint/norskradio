/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Container} from 'cerebral/react'

import {
  AppRegistry,
  DeviceEventEmitter
} from 'react-native';

import controller from 'NorskRadio/src/store/controller'
import MainView from 'NorskRadio/src/components/mainView'

controller.getSignal('init')()

DeviceEventEmitter.addListener(
  'RNMusicStreamerStatusChanged',
  (status) => {
    controller.getSignal('media.mediaStatusChanged')({status})
  }
)

DeviceEventEmitter.addListener(
  'RNMusicStreamerMetadataChanged',
  (metadata) => {
    controller.getSignal('media.metadataChanged')({metadata})
  }
)

export default class NorskRadio extends Component {
  render() {
    return (
      <Container controller={controller}>
        <MainView />
      </Container>
    );
  }
}

AppRegistry.registerComponent('NorskRadio', () => NorskRadio);
