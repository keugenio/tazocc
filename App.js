import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoadingComplete: false,
    };
    try {
      fetch('http://www.tazocc.com//wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((downloadedPosts) => {
        this.setState({ isLoadingComplete: false});
        AsyncStorage.getItem('localIDs').then((localIDs) =>{
          
          let localPostIDs=[];
          let newPostIDs = [];
          let newPosts = [];
          let updatedLocalDataStorage = [];
          
          if (localIDs && localIDs.length>0){
              localPostIDs = JSON.parse(localIDs);
              
              // for each new post, update the newPostIDs array as well as the newPosts array
              downloadedPosts.forEach((downLoadedPost) =>{                
                if (!localPostIDs.includes(downLoadedPost.id)){
                  newPostIDs.push(downLoadedPost.id);
                  newPosts.push(downLoadedPost);
                }
              })
              
              // get all the local posts and add any new post
              AsyncStorage.getItem('localDataStorage').then((results)=>{
                updatedLocalDataStorage = JSON.parse(results);
                
                newPosts.forEach((post) => {
                  updatedLocalDataStorage.push(post)
                })
                AsyncStorage.setItem('localDataStorage', JSON.stringify(updatedLocalDataStorage));

                
              });

              // get all the unread IDs and combine them with the new posts
              AsyncStorage.getItem('newPostIDs').then((results) => {
                const unreadIDs = JSON.parse(results); 
                unreadIDs.forEach((id)=>{
                  newPostIDs.push(id)
                })
                AsyncStorage.setItem('newPostIDs', JSON.stringify(newPostIDs));
                AsyncStorage.setItem('newPostCount', newPostIDs.length.toString());                
              })

              // add IDs for any new post to the array that tracks IDs for all local posts
              newPostIDs.forEach((newPostID) => {
                localPostIDs.push(newPostID);               
              })
              
              // update the local variables
              AsyncStorage.setItem('localIDs', JSON.stringify(localPostIDs));


          } else { 
              // create an array of IDs for the downloaded posts. that represents the "new" and current IDs for the local posts
              // update the the new post count and store the downloaded posts as local data storage
              let localIDArr = [];
              downloadedPosts.forEach(post =>{
                localIDArr.push(post.id);
              })
              AsyncStorage.setItem('localIDs', JSON.stringify(localIDArr));
              AsyncStorage.setItem('newPostIDs', JSON.stringify(localIDArr));
              AsyncStorage.setItem('newPostCount', localIDArr.length.toString());
              AsyncStorage.setItem('localDataStorage', JSON.stringify(downloadedPosts));
          }
        })
        
      })
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducers)}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        

        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono.ttf'),
        'Raleway': require('./assets/fonts/Raleway.ttf'),
        'Quicksand': require('./assets/fonts/Quicksand.ttf'),
        'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'), 
        'Broda':require('./assets/fonts/Broda.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});