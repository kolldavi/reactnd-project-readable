import { combineReducers } from 'redux';
import * as types from '../actions/types';

function categories(state = [], action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
function posts(state = [], action) {
  switch (action.type) {
    case types.GET_POSTS:
      return action.posts;
    case types.ADD_POST:
      const { post } = action;
      return [
        ...state,
        {
          id: post.id,
          timestamp: post.timestamp,
          title: post.title,
          author: post.author,
          body: post.body,
          category: post.category,
          voteScore: post.voteScore,
          deleted: post.deleted
        }
      ];
    case types.EDIT_POST:
      return state.map(
        post =>
          post.id === action.id
            ? {
                ...post,
                title: action.title,
                body: action.body
              }
            : post
      );
    case types.DELETE_POST:
      return state.map(
        post =>
          post.id === action.post.id
            ? {
                ...post,
                deleted: action.post.deleted
              }
            : post
      );
    case types.VOTE_POST:
      return state.map(
        post =>
          post.id === action.post.id
            ? {
                ...post,
                voteScore: action.post.voteScore
              }
            : post
      );
    default:
      return state;
  }
}

function comments(state = [], action) {
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

export default combineReducers({
  categories,
  posts,
  comments
});
