import {UPDATE_NEWPOST_COUNT, UPDATE_NEWPOST_IDS} from './types';

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