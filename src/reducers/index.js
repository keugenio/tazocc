import { combineReducers } from 'redux';
import NewPostCountReducer from './NewPostCountReducer';
import LocalDataSourceReducer from './LocalDataSourceReducer';
import NewPostsIDsReducer from './NewPostIDsReducer';
import SelectPostIDReducer from './SelectPostReducer';

export default combineReducers({
  newPostCount: NewPostCountReducer,
  localDataSource: LocalDataSourceReducer,
  newPostsIDs: NewPostsIDsReducer,
  selectedPostID: SelectPostIDReducer,
})