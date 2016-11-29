//https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

const API_KEY = 'Bearer YOB3YLHZO3NMI6FDXWOW'
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});


module.exports = React.createClass({

  getInitialState(){
    return({
      dataSource: ds.cloneWithRows([]),
      eventType:'',
      city:''
    })
  },

  componentDidMount(){
    // this.searchEvents('hackathon','San Francisco');
  },
  searchEvents(category,city){
      const FETCH_URL = ROOT_URL + '?q='+ category + '&location.address=' + city +'/';
      fetch(FETCH_URL,{
        method: 'GET',
        headers:{
          'Authorization': API_KEY
        }
      })
      .then((response) => response.json())
      .then((responseJSON)=>{
        console.log('responseJSON', responseJSON);
       this.setState({dataSource: ds.cloneWithRows(responseJSON.events)});
      });
  },
  detail(rowData){
    this.props.navigator.push({
      name:'eventDetail',
      title: rowData.name.text,
      description:rowData.description.text,
      url:rowData.url,
      img: rowData.logo.url
    })
  },
  renderRow(rowData){
    const defaultImg = 'https://cdn.pixabay.com/photo/2014/08/21/19/43/question-423604_1280.png';
    let img = rowData.logo != null ? rowData.logo.url: defaultImg;

    return (
      <View style = {styles.row}>
      <Image
        style = {styles.rowlogo}
        source ={{uri: img}}
      />
      <View style = {styles.rowDetails}>
        <Text>
         {rowData.name.text.length > 30 ?
          rowData.name.text.substring(0,30):rowData.name.text}
        </Text>
        <TouchableOpacity
        onPress={()=> this.detail(rowData)}
        >
            <Text style = {styles.link}>
             more details
            </Text>

        </TouchableOpacity>

      </View>

    </View>
    )
  },
  render(){
    return (
      <View style = {styles.container}>
      <Text style={styles.title}>

      </Text>
      <View style = {styles.form}>
        <TextInput
        style = {styles.input}
        placeholder='Event category'
        onChangeText={(text)=> this.setState({eventType: text})}
        />
        <TextInput
        style = {styles.input}
        placeholder='City'
        onChangeText={(text)=> this.setState({city: text})}
        />
        <TouchableOpacity
        onPress={()=>this.searchEvents(this.state.eventType,this.state.city)}
        style={styles.buttonContainer}
        >
          <Text style = {styles.button}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

        <ListView
        style = {styles.list}
        dataSource = {this.state.dataSource}
        enableEmptySections={true}
        renderRow = {(rowData)=> this.renderRow(rowData)}
        />
      </View>

    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#00ffcc'

  },
  title:{
    //flex:1,
    marginTop: 20,
    marginBottom:2,
    textAlign: 'center',
    fontSize:20
  },
  form:{flex:0,
   height:100,
   width: 370

  },
  list:{
    flex:1

  },
  row:{
    flex:4,
    flexDirection:'row',
    padding:2
  },
  rowDetails:{
    flex:5,
    justifyContent:'center',
    alignItems:'center'
  },
  rowlogo:{
    flex:2,
    width:50,
    height:50,
    borderColor:'#000',
    borderWidth:1
  },
  input:{
    flex:1,
    borderColor:'#000',
    borderRadius:5,
    borderWidth:1,
    margin:5,
    textAlign:'center'
  },
  button:{
    flex:1,
    fontSize:16,
    borderColor:'#0000FF',
    borderRadius:4,
    borderWidth:0,
    textAlign:'center',
    padding:10,
    color:'#0000FF'
  },link:{
    color:'#0000FF'
  },buttonContainer:{
    flex:1
  }
  })
