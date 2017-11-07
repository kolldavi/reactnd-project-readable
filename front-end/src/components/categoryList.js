import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/categories.css';
import { connect } from 'react-redux';
import '../styles/categories.css';
class CategoryList extends React.Component {
  render() {
    const { categories } = this.props;

    return (
      <div className="categories">
        <h3>Categories</h3>
        <ul className="category">
          {categories.map(category => (
            <li key={category.name}>
              <Link to={`/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps)(CategoryList);
