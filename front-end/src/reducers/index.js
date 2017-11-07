import { combineReducers } from 'redux';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from '../actions/post';

import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions/comment';

import { GET_CATEGORIES } from '../actions/categories';

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    case ADD_POST:
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
    case EDIT_POST:
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
    case DELETE_POST:
      return state.map(
        post =>
          post.id === action.post.id
            ? {
                ...post,
                deleted: action.post.deleted
              }
            : post
      );
    case VOTE_POST:
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
    case GET_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
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
    case EDIT_COMMENT:
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
    case DELETE_COMMENT:
      return state.map(
        comment =>
          comment.id === action.comment.id
            ? {
                ...comment,
                deleted: action.comment.deleted
              }
            : comment
      );
    case VOTE_COMMENT:
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
