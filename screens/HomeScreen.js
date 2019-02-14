import React from 'react';
import {Image,ScrollView,StyleSheet,Text,View,Dimensions, ActivityIndicator, AsyncStorage, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Philosophies from '../src/components/Philosophies';

const {width, height} = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      dataSource:[],
      newPosts:[],
    } 
    this._showStorage = this._showStorage.bind(this);
  }
  _keyExtractor = (item, index) => item.id;
  static navigationOptions = {
    header: null,
  };

  async componentWillMount(){
    try {
      fetch('http://www.tazocc.com//wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
        });
        
        AsyncStorage.getItem('localIDs').then((localDataSource) =>{

          if (localDataSource && localDataSource.length>0){
            console.log('lds:', localDataSource);
            let localIDs = JSON.parse(localDataSource);
            let newPostIDs = []
            responseJson.forEach((dwnPost) =>{
              if (localIDs.includes(dwnPost.id)==false){
                newPostIDs.push(dwnPost.id);
              }
            })
            console.log("new posts: ", newPostIDs)
            AsyncStorage.setItem('newPostIDs', JSON.stringify(newPostIDs));
            AsyncStorage.setItem('newPostCount', newPostIDs.length.toString());

          } else { // add all the downloaded IDSto localIDs, set the postCount and set the localDataStorage
            alert('no previous post, adding everything');
            let localIDArr = [];
            responseJson.forEach(post =>{
              localIDArr.push(post.id);
            })
            AsyncStorage.setItem('localIDs', JSON.stringify(localIDArr));
            AsyncStorage.setItem('newPostIDs', JSON.stringify(localIDArr));
            AsyncStorage.setItem('newPostCount', localIDArr.length.toString());
            AsyncStorage.setItem('localDataStorage', JSON.stringify(responseJson));
          }        
        })          
      })
      .catch((error) => {
        console.error(error);
      });

    }
    catch (error) {
      console.error(error);
    }   
  }

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
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20, justifyContent:'center', alignItems:'center', backgroundColor:Colors.mainBg}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <TouchableOpacity onPress={this._clearOnePost}>
            <Text>clear post</Text>
          </TouchableOpacity>   
          <TouchableOpacity onPress={this._showStorage}>
            <Text>show storage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._clearEverything}>
            <Text>clear everything</Text>
          </TouchableOpacity>
          <Text>{this.state.newPosts.length}</Text>     
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
