import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  SectionList,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';


import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'

import ChannelList from './channelList'
import MediaControls from './mediaControls'
import AlbumView from './albumView'


var styles = StyleSheet.create({
  main: {
    flex: 1,
    //flexDirection: 'row',
  },
  error: {
    width: 'auto',
    flex: -1,
    height: 32,
    backgroundColor: '#e55',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: '#fff',
    fontSize: 14
  },
  channelList: {
    width: 'auto',
    flex: 1
  },
  mediaContainer: {
    height: 72,
    width: 'auto',
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center'
  },
  mediaControls: {
    flex: 1,
    height: 72,
    width: 'auto',
  }
});




export default connect({
  controlsClicked: signal`app.controlsClicked`,
  expandedControls: state`app.expandedControls`,
  current: state`media.current`,
  error: state`media.isError`,
},
  function Main({current, error, expandedControls, controlsClicked}) {

    let controlsView = (
      <TouchableWithoutFeedback activeOpacity={0.5} onPress={() => controlsClicked()}>
        <View style={styles.mediaContainer}>
          <View style={styles.mediaControls}><MediaControls></MediaControls></View>
        </View>
      </TouchableWithoutFeedback>
    )
    if (expandedControls) {
      controlsView = <AlbumView />
    }
    return <View style={styles.main}>
        {!expandedControls && 
          <View style={styles.channelList}><ChannelList></ChannelList></View>
        }
        {error &&
          <View style={styles.error}><Text style={styles.errorText}>En feil skjedde under avspilling...</Text></View>
        }
        {current &&
          controlsView
        }
      </View>
  }
)