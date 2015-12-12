import React, {
    Component
}
from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {

    render() {
        return (
            <nav className="nav-wrapper primary-bg dark">
                <a href="/" onClick={Link.handleClick} className="brand-logo">
                    <img src={require('./udormio_logo.png')} alt="Udormio" height="40px" style={{margin:'10px'}}/>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <input type="button" id="logout" className="btn-large primary-bg dark" value="logout" />
                </ul>
            </nav>
        );
    }

}

export
default Header;