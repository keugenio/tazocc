import {SELECT_POST} from './types';

export const SelectPostID = (postID) => {  
  return {
      type: SELECT_POST,
      payload: postID
  };
};