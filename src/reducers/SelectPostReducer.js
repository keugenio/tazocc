import {SELECT_POST} from '../actions/types';

export default (state = null , action) =>{
  switch (action.type) {
    case SELECT_POST:
      return action.payload
    default:
      return state
  }
}