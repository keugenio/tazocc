import { UPDATE_LOCAL_DATASOURCE, UPDATE_LOCAL_POSTIDS} from '../actions/types';

const INTIAL_STATE = {
    localDataSource: [],
    localPostIDs: []
};

export default (state = INTIAL_STATE, action) => {

    switch(action.type){
        case UPDATE_LOCAL_DATASOURCE:
          return {...state, localDataSource: action.payload }; 
        case UPDATE_LOCAL_POSTIDS:
          return {...state, localPostIDs: action.payload }; 
        default:
          return state;
    }
};