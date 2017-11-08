import * as types from '../actions/types';

export function categories(state = [], action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
