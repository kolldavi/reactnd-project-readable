import React from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addComment } from '../actions/comment';
import serializeForm from 'form-serialize';

const uuid = require('uuid');

class AddComment extends React.Component {
  state = {
    author: '',
    body: ''
  };

  submitComment = e => {
    e.preventDefault();

    const values = serializeForm(e.target, { hash: true });
    const id = uuid.v4();
    const timestamp = Date.now();
    const parentId = this.props.postId;
    const { author, body } = values;

    API.addComment(id, timestamp, body, author, parentId).then(comment => {
      this.props.dispatch(addComment({ comment }));
    });
  };

  updateAuthor = author => {
    this.setState({ author });
  };
  updateBody = body => {
    this.setState({ body });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitComment}>
          <h3>Add a New Comment</h3>
          <div className="post-inputbox">
            <label className="post-inputbox-lable" htmlFor="add-comment-author">
              Name
            </label>
            <input name="author" id="add-comment-author" type="text" required />
          </div>
          <label className="post-inputbox-lable" htmlFor="add-comment-body">
            Comment
          </label>
          <textarea
            className="post-body"
            name="body"
            id="add-comment-body"
            required
          />
          <div>
            <button className="btn btn-success"> Add Comment </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null)(AddComment);
