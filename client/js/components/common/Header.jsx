/**
 * Created by chan on 11/24/16.
 */

import headerStyle from '../../../style/components/common/header.scss';
import { Link } from 'react-router';

function Header() {
    return (
        <header className={headerStyle.header}>
            <img className={headerStyle.headerIcon} src="assets/wusong_logo.png" />
            <nav>
                <ul>
                    <li><Link to="/">Todo App</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/Settings">Settings</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;