import { UPDATE_POST_IDS, SET_NEW_POST_IDS } from '../actions/types';

const INTIAL_STATE = { 
    IDs: [0],
};

export default (state = INTIAL_STATE, action) => {
    switch(action.type){            
        case UPDATE_POST_IDS:
            return {...state, IDs: action.payload }; 
        case SET_NEW_POST_IDS:
            return {...state, IDs: action.payload };             
        default:
            return state;
    }
};