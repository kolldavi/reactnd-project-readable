import React, { Component } from 'react';
import * as API from '../utils/api';
import PostList from './postList';
import '../styles/categories.css';
class Category extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    API.getCategoryPosts(this.props.match.params.category).then(posts => {
      this.setState({ posts });
    });
  }

  componentWillReceiveProps(nextProps) {
    API.getCategoryPosts(nextProps.match.params.category).then(posts => {
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div className="category-posts">
        <div className="content">
          <div className="posts">
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
