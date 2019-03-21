import {UPDATE_POST_COUNT, UPDATE_POST_IDS, SET_NEW_POST_COUNT, SET_NEW_POST_IDS} from './types';
import { AsyncStorage } from 'react-native';

export const UpdateNewPostIDs = (localPostIDsArray, key) => {
  
    //remove the news item from the unread news
    const index = localPostIDsArray.indexOf(key);
    if (index>=0) {      
      localPostIDsArray.splice(index,1)
    }
    AsyncStorage.setItem('unReadNews', JSON.stringify(localPostIDsArray));

    return {
      type: UPDATE_POST_IDS,
      payload: localPostIDsArray
    }
}

export const UpdateNewPostCount = (currentPostCount) => {

  let updatedPostCount = 0;
  if (currentPostCount-1>=0)
    updatedPostCount = currentPostCount-1

  AsyncStorage.setItem('newPostCount', updatedPostCount.toString());
  return {
    type: UPDATE_POST_COUNT, 
    payload: updatedPostCount
  }
};

export const SetNewPostIDs = (localPostIDsArray) =>{
  // this sets newposts.postids  
  return {
    type: SET_NEW_POST_IDS,
    payload: localPostIDsArray
  }
}
export const SetNewPostCount = (postCount) => {
  return {
    type: SET_NEW_POST_COUNT,
    payload:postCount
  }
}