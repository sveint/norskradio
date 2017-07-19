import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  SectionList,
  TouchableWithoutFeedback
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'


var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    paddingLeft: 5,
    width: 'auto'
  },
  middle: {
    flex: 1,
    paddingLeft: 20,
  },
  right: {
    width: 48
  },
  title: {
    color: '#333',
    fontSize: 16
  },
  subtitle: {
    color: '#777',
    fontSize: 13
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain'
  },
  stopButton: {
    color: '#444',
    fontSize: 20,
    padding: 8
  },
  playButton: {
    color: '#444',
    fontSize: 30,
    padding: 8
  }
});




export default connect({
    currentChannel: state`media.current`,
    currentMetadata: state`media.currentMetadata`,
    isPlaying: state`media.isPlaying`,
    playStopClicked: signal`media.playStopClicked`
  },
  function MediaControls({currentChannel, currentMetadata, isPlaying, playStopClicked}) {
    return (
      currentChannel ? <View style={styles.container}>
        <View style={styles.left}>
          <Image style={styles.logo} source={{uri: currentChannel.logoUrl}} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.title}>{currentChannel.name}</Text>
          <Text style={styles.subtitle}>{currentMetadata}</Text>
        </View>
        <View style={styles.right}>
          <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => playStopClicked()}>
            {isPlaying ? (
              <Icon name="stop" style={styles.stopButton} /> 
            ) : (
            <Icon name="play" style={styles.playButton} />
            )}
          </TouchableWithoutFeedback>
        </View>
      </View> : null
    )
  }
)