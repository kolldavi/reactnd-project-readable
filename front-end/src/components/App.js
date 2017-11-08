import '../styles/App.css';
import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import PostList from './postList';
import CategoryList from './categoryList';
import AddPost from './addPost';
import PostSingle from './postSingle';
import notFound from './notFound';
import Category from './category';
import { getPosts } from '../actions/post';
import { getCategories } from '../actions/categories';

class App extends Component {
  componentDidMount() {
    API.getAllPosts().then(posts => {
      this.props.dispatch(getPosts({ posts }));
    });

    API.getAllCategories().then(categories => {
      this.props.dispatch(getCategories(categories));
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1 className="home-btn">
            <Link to="/">Readable</Link>
          </h1>
          <div className="add-post-link">
            <Link to="/add-post" className="btn btn-primary">
              Add New Post
            </Link>
            <aside className="categories">
              <CategoryList category={this.props.categories} />
            </aside>
          </div>
        </header>

        <main className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div className="content">
                  <div className="posts">
                    <PostList posts={this.props.posts} />
                  </div>
                </div>
              )}
            />

            <Route
              path="/add-post"
              component={AddPost}
              category={this.props.categories}
            />
            <Route
              path="/:category/:id"
              component={PostSingle}
              editing={false}
            />
            <Route path="/:category" component={Category} />
            <Route path="*" component={notFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default withRouter(connect(mapStateToProps)(App));
