import React from 'react';
import * as API from '../utils/api';
import CommentList from './commentList';
import AddComment from './addComment';
import { connect } from 'react-redux';
import { deletePost, editPost, getPosts } from '../actions/post';
import serializeForm from 'form-serialize';
import '../styles/posts.css';

class PostSingle extends React.Component {
  state = {
    post: {},
    isEditing: false
  };
  componentDidMount() {
    API.getPost(this.props.match.params.id).then(post => {
      this.setState({ post });
    });

    if (this.props.location.query !== undefined) {
      this.setState({ isEditing: true });
    }
  }

  deletePost = postId => {
    Promise.resolve(API.deletePost(postId))
      .then(post => {
        this.props.dispatch(deletePost(post));
      })
      .then(() => {
        API.getAllPosts().then(posts => {
          this.props.dispatch(getPosts({ posts }));
          this.props.history.push('/');
        });
      });
  };

  enableEdit = () => {
    this.setState({ isEditing: true });
  };
  cancelEdit = () => {
    this.setState({ isEditing: false });
  };

  updatePost = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const { post } = this.state;

    API.updatePost(post.id, values.title, values.body).then(data => {
      this.props.dispatch(editPost(data.id, data.title, data.body));
      this.setState({ post: data, isEditing: false });
    });
  };

  render() {
    const { post, isEditing } = this.state;
    return (
      <div className="post-single">
        {post.deleted === true || Object.keys(post).length === 0 ? (
          <h2>Sorry, this post has been deleted</h2>
        ) : (
          <div>
            {isEditing === true ? (
              <form onSubmit={this.updatePost}>
                <h1>
                  <input
                    type="text"
                    name="title"
                    className="edit-title"
                    defaultValue={post.title}
                  />
                </h1>
                <div className="post-meta">
                  <span className="post-author">by {post.author}</span>
                </div>
                <p className="post-body">
                  <textarea
                    name="body"
                    className="edit-body"
                    defaultValue={post.body}
                  />
                </p>
                <div className="post-controls">
                  <button className="btn-link btn push-right">
                    Update Post
                  </button>
                  <button
                    className="btn-link"
                    onClick={() => this.cancelEdit()}>
                    Cancel
                  </button>
                  <button
                    className="btn-link red"
                    onClick={() => this.deletePost(post.id)}>
                    Delete Post
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h1>{post.title}</h1>
                <div className="post-meta">
                  <span className="post-author">Created by: {post.author}</span>
                  <span>
                    Posted at: {new Date(post.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="post-body">{post.body}</p>
                <div className="post-controls">
                  <button
                    className="btn-link"
                    onClick={() => this.enableEdit()}>
                    Edit Post
                  </button>
                  <button
                    className="btn-link red"
                    onClick={() => this.deletePost(post.id)}>
                    Delete Post
                  </button>
                </div>
              </div>
            )}
            <div className="comments">
              <AddComment postId={this.props.match.params.id} />
              <CommentList postId={this.props.match.params.id} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(PostSingle);
