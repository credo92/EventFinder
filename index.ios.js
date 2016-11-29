import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './src/main';

class EventFinder extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('EventFinder', () => EventFinder);
