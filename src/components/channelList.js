import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  SectionList,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'

import CachedImage from 'react-native-cached-image'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import channelsBySection from '../store/channels/computed/channelsBySection'
import isFavorite from '../store/channels/computed/isFavorite'


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  logo: {
    height:48,
    width: 48,
    marginLeft: 4
  },
  favContainer: {
    height: 48,
    marginRight: 18,
    justifyContent: 'center'
  },
  fav: {
    fontSize: 24,
    color: '#8d8d8d'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    marginLeft: 18,
    fontSize: 16
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  headingText: {
    fontSize: 16,
    padding: 10,
    color: '#777'
  }
});

let ChannelListItem = connect({
    channel: state`channels.channels.${props`name`}`,
    favoriteClicked: signal`channels.favoriteClicked`,
    isFavorite: isFavorite(props`name`)
  },
  function ChannelListItem({channel, favoriteClicked, isFavorite}) {
    
    let favTag = isFavorite ? 'heart' : 'heart-o'
    return <View style={styles.container}>
      <CachedImage 
        style={styles.logo}
        source={{uri: channel.logoUrl}}
        resizeMode={'contain'} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{channel.name}</Text>
      </View>
      <TouchableOpacity onPress={() => favoriteClicked({name: channel.name})}>
        <View style={styles.favContainer}>
          <Icon name={favTag} style={styles.fav} /> 
        </View>
      </TouchableOpacity>
    </View>
  }
)



export default connect({
    channelsBySection,
    channelClicked: signal`media.channelClicked`
  },
  function ChannelList({channelsBySection, channelClicked}) {
    return <SectionList
      keyboardShouldPersistTaps='always'
      renderItem={({item}) => (
        <TouchableNativeFeedback onPress={() => channelClicked({channel: item})}>
          <View><ChannelListItem name={item}/></View> 
        </TouchableNativeFeedback>
      )}
      renderSectionHeader={
        ({section}) => <View style={styles.heading}>
          <Text style={styles.headingText}>{section.title}</Text>
        </View>
      }
      sections={channelsBySection}
      keyExtractor={name => name}
    >
      </SectionList>
  }
)