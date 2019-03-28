import React from 'react';
import {Image,ScrollView,StyleSheet,Text,View,Dimensions, AsyncStorage, TouchableOpacity, Platform} from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Philosophies from '../src/components/Philosophies';
import { connect } from 'react-redux';
import { Video } from 'expo';
import * as actions from '../src/actions'
import Loader from '../src/components/Loader';
import TabBarIcon from '../components/TabBarIcon';

const {width, height} = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
  }
  
  componentWillMount(){
    AsyncStorage.getItem("unReadNews").then((results)=>{
      this.props.SetNewPostIDs(JSON.parse(results))
    })
  }
  componentDidMount(){
    AsyncStorage.getItem("unReadNews").then((results)=>{
      this.props.SetNewPostIDs(JSON.parse(results))
    })
  }

  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home`
            : 'md-home'
        }
      />
    ),
  };

  _clearEverything(){
    AsyncStorage.clear();
  }
  async _showStorage() {
    console.log('**************************');
    
     await AsyncStorage.getItem('unReadNews').then((results) =>{
        if (results){
          console.log("unReadNews", JSON.parse(results));
        }
        else
          console.log('unReadIDs empty');
      }); 
      await AsyncStorage.getItem('readNews').then((results) =>{
        if (results){
          console.log("readNews", JSON.parse(results));
        }
        else
          console.log('readIDs empty');
      });       
     await AsyncStorage.getItem('localDataStorage').then((results) =>{
        if (results){
          console.log("localDataStorage", JSON.parse(results));
        }
        else
          console.log('localDS empty');
      });   
    console.log('**************************');  

  }
  // for future releases for admin tools.
  _showAdminTools(){
    return (
      <View>  
        <TouchableOpacity onPress={this._showStorage}>
          <Text style={{color:'#FFFFFF', fontSize:25}}>show storage in console log</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._clearEverything}>
          <Text style={{color:'#FFFFFF', fontSize:25}}>clear everything</Text>
        </TouchableOpacity>      
      </View>
    )    
  }
  _loaderOff = () => {
    this.setState({loading:false});
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>  
          <Image source={require('../src/images/header.png')} style={styles.headerImageStyle}/>
          </View>
          <View style={styles.mainBodyContainer}>
            <Image source={require('../src/images/homescreen1.jpg')} style={styles.imageStyle}/> 
            <Loader loading={this.state.loading} />
            <Video
              source={{ uri: 'http://tazocc.com/wp-content/uploads/2019/03/TAZ_APP_Video.mov' }}
              rate={1.0}
              volume={0.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              isLooping
              style={{ width: width, height: 300 }}
              onReadyForDisplay={()=>{
                this._loaderOff()
              }}
            />

            <View style={{marginVertical:FontSize.FONTSIZE*2, paddingLeft:30, paddingRight:30}}>
              <Text style={[styles.pHighlight,{color:'#FFFF00', fontSize:FontSize.FONTSIZE*3, fontFamily:'Broda', textAlign:'center'}]}>our Mission</Text>
              <Text style={styles.mainBodyText}>to promote the Hawaiian culture through competitive and recreational outrigger canoe paddling for youth (keikis), family (ohana), and the community.</Text>            
            </View>
            <Image source={require('../src/images/adr2018.jpg')} style={styles.imageStyle}/>
            <Philosophies />  
            <Image source={require('../src/images/christmas-2018.jpg')} style={styles.imageStyle}/> 
          </View>
        </ScrollView>  
      </View>
    );
  }
}
mapStateToProps = (state) => {  
  return {
    newPosts: state.newPosts,
    localDataSource: state.localDataSource,
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
  },
  mainBodyContainer: {
    alignItems:'stretch',
    flex:1
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
    resizeMode:'contain',
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
