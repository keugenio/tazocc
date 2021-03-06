import { combineReducers } from 'redux';
import NewPostsReducer from './NewPostsReducer';
import LocalDataSourceReducer from './LocalDataSourceReducer';
import SelectPostIDReducer from './SelectPostReducer';

export default combineReducers({
  newPosts: NewPostsReducer,
  localDataSource: LocalDataSourceReducer,
  selectedPostID: SelectPostIDReducer,
})