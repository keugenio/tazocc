import {UPDATE_NEWPOST_COUNT, SET_NEWPOST_IDS, UPDATE_NEWPOST_IDS, SET_NEWPOST_COUNT} from './types';

export const UpdateNewPostCount = (currentPostCount) => {
  return {
    type: UPDATE_NEWPOST_COUNT, 
    payload: currentPostCount > 0 ? currentPostCount-1:0
  }
};

export const UpdateNewPostIDs = (localPostIDsArray, key) => {
    const index = localPostIDsArray.indexOf(key);
    if (index>=0)
      localPostIDsArray.splice(index,1)
    
    return {
      type: UPDATE_NEWPOST_IDS,
      payload: localPostIDsArray
    }
}
export const SetNewPostIDs = (localPostIDsArray) => {
  return {
    type: SET_NEWPOST_IDS,
    payload: localPostIDsArray
  }
}

export const SetNewPostCount = (newPostCount) => {
  return {
    type: SET_NEWPOST_COUNT,
    payload: newPostCount
  }
}