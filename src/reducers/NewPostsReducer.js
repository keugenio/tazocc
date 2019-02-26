import { UPDATE_NEWPOST_COUNT, UPDATE_NEWPOST_IDS, SET_NEWPOST_COUNT,SET_NEWPOST_IDS} from '../actions/types';

const INTIAL_STATE = { 
    postCount: 5, 
    postIDs: [1863,1855,1823,1818, 1817],
};

export default (state = INTIAL_STATE, action) => {

    switch(action.type){
        case SET_NEWPOST_COUNT:
            return {...state, postCount: action.payload }; 
        case SET_NEWPOST_IDS:
            return {...state, postIDs: action.payload };         
        case UPDATE_NEWPOST_COUNT:
            return {...state, postCount: action.payload }; 
        case UPDATE_NEWPOST_IDS:
            return {...state, postIDs: action.payload }; 
        default:
            return state;
    }
};