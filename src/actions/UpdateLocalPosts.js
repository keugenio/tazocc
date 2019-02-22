import { UPDATE_LOCAL_DATASOURCE, UPDATE_LOCAL_POSTIDS } from '../actions/types';

export const UpdateLocalDataSource = (updatedDataSource) =>{
  return {
    type:UPDATE_LOCAL_DATASOURCE,
    payload: updatedDataSource
  }
}

export const UpdateLocalPostIds = (updatedLocalPostIDs) =>{
  return {
    type: UPDATE_LOCAL_POSTIDS,
    payload: updatedLocalPostIDs
  }
}