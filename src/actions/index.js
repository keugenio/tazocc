export const SelectPostID = (postID) => {
  return {
      type: 'select_post',
      payload: postID
  };
};