import React, { Component, PropTypes } from 'react';

class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle('Log In');
  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default LoginPage;
