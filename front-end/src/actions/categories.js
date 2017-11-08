import * as types from './types';

export function getCategories({ categories }) {
  return {
    type: types.GET_CATEGORIES,
    categories
  };
}
