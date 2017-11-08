import * as types from '../actions/types';

export function posts(state = [], action) {
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
