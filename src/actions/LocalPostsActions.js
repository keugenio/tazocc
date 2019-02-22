import { UPDATE_LOCAL_DATASOURCE, UPDATE_LOCAL_POSTIDS, SET_POST_IDS, SET_LOCAL_DATASOURCE,  } from './types';

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

export const SetLocalPostIds = (updatedLocalPostIDs) =>{
  return {
    type: SET_POST_IDS,
    payload: updatedLocalPostIDs
  }
}

export const SetLocalDataSource = (updatedLocalPostIDs) =>{
  return {
    type: SET_LOCAL_DATASOURCE,
    payload: updatedLocalPostIDs
  }
}