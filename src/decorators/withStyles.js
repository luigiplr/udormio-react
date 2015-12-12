import React, { Component, PropTypes } from 'react';

export default (...styles) =>{
  return (BaseComponent) => class StyledComponent extends Component {
    static contextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    componentWillMount() {
      this.removeCss = this.context.insertCss.apply(undefined, styles);
    }

    componentWillUnmount() {
      this.removeCss();
    }

    render() {
      return (<BaseComponent {...this.props} />);
    }
  };
};
