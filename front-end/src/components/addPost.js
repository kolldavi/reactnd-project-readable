import React from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addPost } from '../actions/post';
import serializeForm from 'form-serialize';
import { withRouter, Redirect } from 'react-router-dom';

const uuid = require('uuid');

class AddPost extends React.Component {
  state = {
    categories: [],
    fireRedirect: false,
    postId: null,
    postCategory: null
  };

  submitPost = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = uuid.v4();
    const timestamp = Date.now();
    const { title, author, category, body } = values;

    API.addPost(id, timestamp, title, body, author, category).then(post => {
      this.props.dispatch(addPost(post));
      this.setState({
        fireRedirect: true,
        postId: post.id,
        postCategory: post.category
      });
    });
  };

  render() {
    const { postId, postCategory } = this.state;
    const categories = this.props.categories;
    return (
      <div className="add-new-post">
        <form onSubmit={this.submitPost}>
          <h3>Add a New Post</h3>
          <div className="post-inputbox">
            <label className="post-inputbox-lable" htmlFor="add-post-title">
              Title
            </label>
            <input name="title" id="add-post-title" type="text" required />
          </div>
          <div className="post-inputbox">
            <label className="post-inputbox-lable" htmlFor="add-post-author">
              Author
            </label>
            <input name="author" id="add-post-author" type="text" required />
          </div>
          <div className="post-inputbox">
            <label className="post-inputbox-lable" htmlFor="add-post-category">
              Category
            </label>
            <select name="category" id="add-post-category">
              {categories.map(cat => (
                <option value={cat.name} key={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="post-inputbox">
            <label className="post-inputbox-lable" htmlFor="add-post-body">
              Body
            </label>
            <textarea
              className="post-body"
              name="body"
              id="add-post-body"
              required
            />
          </div>
          <button className="btn btn-primary">Add Post</button>
        </form>
        {this.state.fireRedirect && (
          <Redirect to={`/${postCategory}/${postId}`} />
        )}
      </div>
    );
  }
}
function mapStateToProps({ categories }) {
  return { categories };
}
export default withRouter(connect(mapStateToProps)(AddPost));
