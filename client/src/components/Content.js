import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <h1>Content</h1>
      </div>
    );
  }
}

export default hot(module)(Content);
