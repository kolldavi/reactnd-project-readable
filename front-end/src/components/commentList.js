import React, { Component } from 'react';
import * as API from '../utils/api';
import { getComments } from '../actions/comment';
import { connect } from 'react-redux';
import Comment from './comment';
import sortBy from 'lodash/sortBy';
import '../styles/comments.css';

class CommentList extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    API.getPostComments(this.props.postId).then(comments => {
      this.props.dispatch(getComments({ comments }));
    });
  }

  render() {
    const { comments } = this.props;
    const numComments = comments.filter(
      comment => comment.deleted !== true && comment.parentDeleted !== true
    ).length;

    return (
      <div className="comment-list">
        <p> {numComments} comments</p>

        <ul>
          {sortBy(comments, 'voteScore')
            .reverse()
            .filter(
              comment =>
                comment.deleted !== true && comment.parentDeleted !== true
            )
            .map(comment => <Comment key={comment.id} comment={comment} />)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps)(CommentList);
