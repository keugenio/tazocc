import { UPDATE_POST_COUNT, UPDATE_POST_IDS} from '../actions/types';

const INTIAL_STATE = { 
    postCount: 5, 
    postIDs: [1863,1855,1823,1818, 1817],
};

export default (state = INTIAL_STATE, action) => {

    switch(action.type){
        case UPDATE_POST_COUNT:
            return {...state, postCount: action.payload }; 
        case UPDATE_POST_IDS:
            return {...state, postIDs: action.payload }; 
        default:
            return state;
    }
};