import { combineReducers } from 'redux';
import { comments } from './comments';
import { posts } from './posts';
import { categories } from './categories';

export default combineReducers({
  categories,
  posts,
  comments
});
