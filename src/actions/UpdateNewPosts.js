import {UPDATE_POST_COUNT, UPDATE_POST_IDS} from './types';

export const UpdateNewPostCount = (currentPostCount) => {
  return {
    type: UPDATE_POST_COUNT, 
    payload: currentPostCount > 0 ? currentPostCount-1:0
  }
};

export const UpdateNewPostIDs = (localPostIDsArray, key) => {
    const index = localPostIDsArray.indexOf(key);
    if (index>=0)
      localPostIDsArray.splice(index,1)

    return {
      type: UPDATE_POST_IDS,
      payload: localPostIDsArray
    }
}