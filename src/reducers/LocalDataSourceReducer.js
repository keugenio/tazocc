import { UPDATE_LOCAL_DATASOURCE} from '../actions/types';

const localDataSource = require('./localPosts.json')
const INTIAL_STATE = {
    localDataSource: localDataSource
};

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_LOCAL_DATASOURCE:          
          return {...state, localDataSource: action.payload }; 
        default:
          return state;
    }
};