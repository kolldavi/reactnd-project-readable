import React from 'react';
import Post from './post';
import '../styles/posts.css';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import FlatButton from 'material-ui/FlatButton';
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
          <FlatButton
            key={uuid.v4()}
            onClick={() => this.sort('voteScore')}
            label="Most Votes"
            primary={true}
          />
          <FlatButton
            key={uuid.v4()}
            onClick={() => this.sort('voteScore', true)}
            label="Least Votes"
            primary={true}
          />
          <FlatButton
            key={uuid.v4()}
            onClick={() => this.sort('timestamp')}
            label="Newest First"
            primary={true}
          />
          <FlatButton
            key={uuid.v4()}
            onClick={() => this.sort('timestamp', true)}
            label="Oldest First"
            primary={true}
          />
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
