import React from 'react';
import {Image,ScrollView,StyleSheet,Text,View,Dimensions, ActivityIndicator, AsyncStorage, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Philosophies from '../src/components/Philosophies';
import { connect } from 'react-redux';
import * as actions from '../src/actions'

const {width, height} = Dimensions.get('window');

class HomeScreen extends React.Component {

  _clearOnePost() {
    AsyncStorage.getItem('localDataStorage').then((results) =>{

      if (results){ // pop an item from localDataStorage and pop an id from localIDs 
        const localDS = JSON.parse(results);
        const localIDsArr = [];

        localDS.pop();
        AsyncStorage.setItem('localDataStorage', JSON.stringify(localDS));

        localDS.forEach((post)=>{
          localIDsArr.push(post.id);
        })
        AsyncStorage.setItem('localIDs', JSON.stringify(localIDsArr));
        AsyncStorage.setItem('newPostIDs', JSON.stringify(localIDsArr));
        AsyncStorage.setItem('newPostCount', localIDsArr.length.toString());
      }
      else
        console.log('storage empty');
    })
  }
  _clearEverything(){
    AsyncStorage.clear();
  }
  _showStorage() {

     AsyncStorage.getItem('newPostCount').then((results) =>{
      if (results){
        console.log("newPostCount", results);
      }
      else
        console.log('newPostCount empty');
    });
     AsyncStorage.getItem('newPostIDs').then((results) =>{
      if (results){
        console.log("newPostsIDs", JSON.parse(results));
      }
      else
        console.log('newPostsIDs empty');
    });
     AsyncStorage.getItem('localIDs').then((results) =>{
      if (results){
        console.log("localIDs", JSON.parse(results));
      }
      else
        console.log('localIDs empty');
    }); 
     AsyncStorage.getItem('localDataStorage').then((results) =>{
      if (results){
        console.log("localDataStorage", JSON.parse(results));
      }
      else
        console.log('localDS empty');
    });  

  }
  _getUnreadPosts(){
    switch (this.props.newPostCount) {
      case (this.props.newPostCount>1):
        return <Text>You have {this.props.newPostCount} unread posts: </Text>
      case (this.props.newPostCount=1):
        return <Text>You have 1 unread post </Text>
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <TouchableOpacity onPress={this._clearOnePost}>
            <Text>clear post</Text>
          </TouchableOpacity>   
          <TouchableOpacity onPress={this._showStorage}>
            <Text>show storage in console log</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._clearEverything}>
            <Text>clear everything</Text>
          </TouchableOpacity>         

               
          <View style={styles.headerContainer}>
            <Image source={require('../src/images/header_copy.png')} style={styles.headerImageStyle}/>
          </View>

          <View style={styles.mainBodyContainer}>
          
            <Image source={require('../src/images/adr2018.jpg')} style={styles.imageStyle}/>             
            
            <View style={{marginVertical:FontSize.FONTSIZE*2}}>
              <Text style={[styles.pHighlight,{color:'#FFFF00', fontSize:FontSize.FONTSIZE*3, fontFamily:'Broda', textAlign:'center'}]}>our Mission</Text>
              <Text style={styles.mainBodyText}>to promote the Hawaiian culture through competitive and recreational outrigger canoe paddling for youth (keikis), family (ohana), and the community.</Text>            
            </View>

            <Image source={require('../src/images/trailing.jpg')} style={styles.imageStyle}/>  
             
            <Philosophies />  
           
            <Image source={require('../src/images/auntyaloha.jpg')} style={[styles.imageStyle,{opacity:.75}]}/>             
          </View>

        </ScrollView>  
      </View>
    );
  }
}
mapStateToProps = (state) => {
  return {
    newPostCount: state.newPosts.postCount
  }
}

export default connect(mapStateToProps, actions)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBg,
  },
  contentContainer: {
    paddingTop: 30,
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  mainBodyContainer: {
    alignItems:'stretch',
    flex:1
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  mainBodyText: {
    fontSize: FontSize.FONTSIZE,
    color: 'rgba(227, 242, 253, 1)',
    lineHeight: FontSize.FONTSIZE,
    textAlign: 'center',
    fontFamily:'Raleway',
  },
  imageStyle: {
    height:.35*height,
    width,
    resizeMode:'cover',
    marginTop:10,
    marginBottom:10
  },
  headerImageStyle:{
    height:.25*height,
    width,
    resizeMode:'contain',
    tintColor:'#44a4f2',    
  },
  pHighlight:{
    color:'#FFFF00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    fontFamily:'Broda',
  },
});
