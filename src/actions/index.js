export const SelectPost = (postID) => {
  return {
      type: 'select_post',
      payload: postID
  };
};