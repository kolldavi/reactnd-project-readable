import React, { Component } from 'react';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { voteComment, deleteComment, editComment } from '../actions/comment';
import serializeForm from 'form-serialize';
import '../styles/comments.css';

class Comment extends Component {
  state = {
    isEditing: false
  };

  voteComment = (commentId, option) => {
    API.voteComment(commentId, option).then(comment => {
      this.props.dispatch(voteComment({ comment }));
    });
  };

  enableEdit = () => {
    this.setState({ isEditing: true });
  };

  cancelEdit = () => {
    this.setState({ isEditing: false });
  };

  updateComment = event => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    const { comment } = this.props;
    const timestamp = Date.now();

    API.updateComment(comment.id, timestamp, values.body).then(data => {
      this.props.dispatch(editComment(data.id, data.timestamp, data.body));
      this.setState({ isEditing: false });
    });
  };

  deleteComment = commentId => {
    API.deleteComment(commentId).then(data => {
      this.props.dispatch(deleteComment(data));
    });
  };

  render() {
    const { comment } = this.props;
    const { isEditing } = this.state;

    return (
      <li className="comment">
        <div className="comment-ranking">
          <button
            className="ranking-button"
            onClick={() => this.voteComment(comment.id, 'upVote')}>
            <FaCaretUp />
          </button>
          <div className="comment-ranking-value">{comment.voteScore}</div>
          <button
            className="ranking-button"
            onClick={() => this.voteComment(comment.id, 'downVote')}>
            <FaCaretDown />
          </button>
        </div>
        {isEditing === true ? (
          <form onSubmit={this.updateComment}>
            <p>
              <textarea
                name="body"
                className="inline-input"
                defaultValue={comment.body}
              />
            </p>
            <div className="comment-meta">
              <span className="comment-author">by {comment.author}</span>
            </div>
            <div className="comment-controls">
              <button className="btn btn-success">Update Comment</button>
              <button
                className="btn btn-secondary"
                onClick={() => this.cancelEdit()}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteComment(comment.id)}>
                Delete Comment
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>{comment.body}</p>
            <div className="comment-meta">
              <span className="comment-author">by {comment.author}</span>
            </div>
            <div className="comment-controls">
              <button
                className="btn btn-primary"
                onClick={() => this.enableEdit()}>
                Edit Comment
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteComment(comment.id)}>
                Delete Comment
              </button>
            </div>
          </div>
        )}
      </li>
    );
  }
}
export default connect(null)(Comment);
