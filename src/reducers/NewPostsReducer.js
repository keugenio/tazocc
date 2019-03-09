import { UPDATE_POST_COUNT, UPDATE_POST_IDS, SET_NEW_POST_IDS, SET_NEW_POST_COUNT} from '../actions/types';
import { AsyncStorage } from "react-native";
const INTIAL_STATE = { 
    postCount: 0, 
    postIDs: [],
};

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_POST_COUNT:
            console.log("updating post count");            
            AsyncStorage.setItem('newPostCount', JSON.stringify(action.payload))
            return {...state, postCount: action.payload }; 
        case SET_NEW_POST_COUNT:
            return {...state, postCount: action.payload };             
        case UPDATE_POST_IDS:
            console.log("updating post ids");
            AsyncStorage.setItem('newPostIDs', JSON.stringify(action.payload))
            return {...state, postIDs: action.payload }; 
        case SET_NEW_POST_IDS:
            return {...state, postIDs: action.payload };             
        default:
            return state;
    }
};