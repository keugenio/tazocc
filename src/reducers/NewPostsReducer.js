import { UPDATE_POST_COUNT, UPDATE_POST_IDS} from '../actions/types';

const INTIAL_STATE = { 
    postCount: 2, 
    postIDs: [1863, 1855],
};

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_POST_COUNT:
            return {...state, email: action.payload }; 
        case UPDATE_POST_IDS:
            return {...state, password: action.payload }; 
        default:
            return state;
    }
};