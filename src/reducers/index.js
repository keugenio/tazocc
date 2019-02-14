import { combineReducers } from 'redux';
import NewPostCountReucer from './NewPostCountReducer';
import LocalDataSource from './LocalDataSourceReducer';
import NewPostsIDs from './NewPostIDsReducer';

export default combineReducers({
  newPostCount: NewPostCountReucer,
  localDataSource: LocalDataSource,
  newPostsIDs: NewPostsIDs
})