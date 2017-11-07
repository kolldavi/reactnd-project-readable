const clone = require('clone');

let db = {};

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  '6ni6ok3ym7mf1p332nez': {
    id: '6ni6ok3ym7mf1p332nez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  '6ni6ok3ym7mf1p332ne1': {
    id: '6ni6ok3ym7mf1p332ne1',
    timestamp: 146847967199,
    title: 'Learn Redux in 20 minutes!',
    body: 'Just kidding. It takes more than 20 minutes to learn technology.',
    author: 'thingo2ne',
    category: 'redux',
    voteScore: -1,
    deleted: false
  },
  '6ni6ok3ym7mf1p322nez': {
    id: '6ni6ok3ym7mf1p322nez',
    timestamp: 1468479767891,
    title: 'Learn Redux in 40 minutes!',
    body: 'Just kidding. It takes more than 40 minutes to learn technology.',
    author: 'thing4one',
    category: 'redux',
    voteScore: 5,
    deleted: false
  }
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    );
    res(filtered_keys.map(key => posts[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => !posts.deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token);

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
};
