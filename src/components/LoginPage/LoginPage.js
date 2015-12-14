import React, {
    Component, PropTypes
}
from 'react';

class LoginPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.context.onSetTitle('Log In');
    }

    render() {
        console.log('rendering login!')
        return (
            <div>
              Login page
            </div>
        );
    }

}

export
default LoginPage;