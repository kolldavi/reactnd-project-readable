import * as types from './types';

export function getPosts({ posts }) {
  return {
    type: types.GET_POSTS,
    posts
  };
}

export function addPost(post) {
  return {
    type: types.ADD_POST,
    post
  };
}

export function editPost(id, title, body) {
  return {
    type: types.EDIT_POST,
    id,
    title,
    body
  };
}

export function votePost({ post }) {
  return {
    type: types.VOTE_POST,
    post
  };
}

export function deletePost(post) {
  return {
    type: types.DELETE_POST,
    post
  };
}
