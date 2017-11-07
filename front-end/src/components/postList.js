import React from 'react';
import Post from './post';
import '../styles/posts.css';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
const uuid = require('uuid');
class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
      sortTerms: '',
      reverse: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: nextProps.posts
    });
  }

  sort = (term, reverse = false) => {
    this.setState({
      sortTerms: term,
      reverse: reverse
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <div>
        <div className="order-btns">
          Sort by Votes
          <button
            key={uuid.v4()}
            onClick={() => this.sort('voteScore')}
            className="btn-link">
            Most Votes
          </button>
          <button
            key={uuid.v4()}
            onClick={() => this.sort('voteScore', true)}
            className="btn-link">
            Least Votes
          </button>
          <button
            key={uuid.v4()}
            onClick={() => this.sort('timestamp')}
            className="btn-link">
            Newest First
          </button>
          <button
            key={uuid.v4()}
            onClick={() => this.sort('timestamp', true)}
            className="btn-link">
            Oldest First
          </button>
          <hr />
        </div>
        <ul className="post-list">
          {this.state.reverse
            ? sortBy(posts, this.state.sortTerms)
                .filter(post => post.deleted !== true)
                .map(post => <Post post={post} key={post.id} />)
            : sortBy(posts, this.state.sortTerms)
                .reverse()
                .filter(post => post.deleted !== true)
                .map(post => <Post post={post} key={post.id} />)}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({ post }) {
  return { post };
}
export default connect(mapStateToProps)(PostList);
