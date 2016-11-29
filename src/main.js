import React, {Component} from 'react';
import {
  Navigator
} from 'react-native';

import Events from './components/events';
import EventDetail from './components/event_detail';
const routes ={
  events: Events,
  eventDetail: EventDetail
}
module.exports = React.createClass({
render(){
    return (<Navigator
            initialRoute ={{name: 'events'}}
            renderScene={this.renderScene}/>
    )
  },
  renderScene(route,navigator){
    let Component = routes[route.name];
    return(<Component
            navigator = {navigator}
            title ={route.title}
            description={route.description}
            url={route.url}
            img={route.img}
            />)
  }
})
