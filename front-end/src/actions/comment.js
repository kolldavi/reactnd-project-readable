import * as types from './types';

export function getComments({ comments }) {
  return {
    type: types.GET_COMMENTS,
    comments
  };
}

export function addComment({ comment }) {
  return {
    type: types.ADD_COMMENT,
    comment
  };
}

export function voteComment({ comment }) {
  return {
    type: types.VOTE_COMMENT,
    comment
  };
}

export function editComment(id, timestamp, body) {
  return {
    type: types.EDIT_COMMENT,
    id,
    timestamp,
    body
  };
}

export function deleteComment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment
  };
}
