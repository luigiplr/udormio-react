import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
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
