import React, {
    Component, PropTypes
}
from 'react';

class HomePage extends Component {

    static propTypes = {
      LoggedIn: PropTypes.bool.isRequired,
    };

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.context.onSetTitle('Udormio');
    }

    render() {
        return (
            <div>
                LoggedIn: {this.props.loggedIn.toString()} 

                <br/>

                Home page
            </div>
        );
    }

}

export
default HomePage;