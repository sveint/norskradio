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

import isFavorite from '../store/channels/computed/isFavorite'


var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    paddingTop: 15,
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    paddingLeft: 18,
  },
  headerRight: {
    paddingRight: 18
  },
  headerCollapseBtn: {
    fontSize: 36,
  },
  headerFavBtn: {
    fontSize: 32,
  },
  infoContainer: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  infoTitle: {
    color: '#333',
    fontSize: 25
  },
  infoSubtitle: {
    width: '70%',
    color: '#777',
    fontSize: 15,
    width: 'auto'
  },
  logoContainer: {
    paddingTop: 30,
    flex: 2,
    minHeight: 100,
  },
  logoImage: {
    flex: 1,
    margin: 30,
    resizeMode: 'contain'
  },
  controlsContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    height: 150
  },
  controlsRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  controlsPlayButton: {
    color: '#444',
    fontSize: 50,
    fontWeight: 'normal',
    padding: 8,
    paddingLeft: 40,
    paddingRight: 40
  },
  controlsNextButton: {
    color: '#444',
    fontSize: 40,
    padding: 8
  }  
});



// TODO: Split into components

export default connect({
    currentChannel: state`media.current`,
    currentMetadata: state`media.currentMetadata`,
    isPlaying: state`media.isPlaying`,
    playStopClicked: signal`media.playStopClicked`,
    nextChannelClicked: signal`media.nextChannelClicked`,
    prevChannelClicked: signal`media.prevChannelClicked`,
    playStopClicked: signal`media.playStopClicked`,
    controlsClicked: signal`app.controlsClicked`,
    favoriteClicked: signal`channels.favoriteClicked`,
    isFavorite: isFavorite(state`media.current.name`)
  },
  function AlbumView({
    currentChannel,
    currentMetadata,
    isPlaying,
    playStopClicked,
    nextChannelClicked,
    prevChannelClicked,
    controlsClicked,
    favoriteClicked,
    isFavorite
  }) {
    
    let favTag = isFavorite ? 'heart' : 'heart-o'
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => controlsClicked()}>
              <Icon style={styles.headerCollapseBtn} name="angle-down" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.headerRight}>
            <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => favoriteClicked({name: currentChannel.name})}>
              <Icon style={styles.headerFavBtn} name={favTag} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={{uri: currentChannel.logoUrl}} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{currentChannel.name}</Text>
          <Text style={styles.infoSubtitle}>{currentMetadata}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.controlsRow}>
            <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => prevChannelClicked()}>
              <Icon name="step-backward" style={styles.controlsNextButton} />
            </TouchableWithoutFeedback>
          <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => playStopClicked()}>
            {isPlaying ? (
              <Icon name="stop" style={styles.controlsPlayButton} /> 
            ) : (
            <Icon name="play" style={styles.controlsPlayButton} />
            )}
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => nextChannelClicked()}>
            <Icon name="step-forward" style={styles.controlsNextButton} />
          </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
)