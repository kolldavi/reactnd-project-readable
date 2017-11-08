import * as types from '../actions/types';

export function comments(state = [], action) {
  switch (action.type) {
    case types.GET_COMMENTS:
      return action.comments;
    case types.ADD_COMMENT:
      const { comment } = action;
      return [
        ...state,
        {
          id: comment.id,
          parentId: comment.parentId,
          timestamp: comment.timestamp,
          author: comment.author,
          body: comment.body,
          voteScore: comment.voteScore,
          deleted: comment.deleted,
          parentDeleted: comment.parentDeleted
        }
      ];
    case types.EDIT_COMMENT:
      return state.map(
        comment =>
          comment.id === action.id
            ? {
                ...comment,
                timestamp: action.timestamp,
                body: action.body
              }
            : comment
      );
    case types.DELETE_COMMENT:
      return state.map(
        comment =>
          comment.id === action.comment.id
            ? {
                ...comment,
                deleted: action.comment.deleted
              }
            : comment
      );
    case types.VOTE_COMMENT:
      return state.map(
        comment =>
          comment.id === action.comment.id
            ? {
                ...comment,
                voteScore: action.comment.voteScore
              }
            : comment
      );
    default:
      return state;
  }
}
