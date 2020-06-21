import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, getCurrentProfile, profile, match }) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);
   
    const authLinks = (
        <ul className="navbar-nav">
            <li className="nav-item"><i className="fas fa-bars nav-link hamburger" ></i></li>
            <li className="nav-item"><p className="nav-link"><span class="link-text"><img src={user && user.avatar} alt="pfp" /></span></p></li>
            <li className="nav-item"><p className="nav-link"><span class="link-text">Welcome, <br /> { user && user.name }</span></p></li>
            <li className="nav-item"> <Link className="nav-link" to='/profiles'><span class="link-text">-Profiles</span></Link> </li>
            <li className="nav-item"> <Link className="nav-link" to='/dashboard'><span class="link-text">-Dashboard</span></Link> </li>
            <li className="nav-item"> <Link className="nav-link" to='/posts'><span class="link-text">-Sheds</span></Link>    </li>
            <li className="nav-item"> <Link className="nav-link" to='/post'><span class="link-text">-Host a shed</span></Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/help"><span class="link-text">-Help</span></Link></li>
            <li className="nav-item"><a className="nav-link" onClick={logout} href="#!"><span class="link-text">-Sign out</span></a></li>
            <li className="nav-item"> <p className="nav-link"><span class="link-text">&copy;2020 Shedbnb</span></p></li>
        </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav">
            <li className="nav-item"><i className="fas fa-bars nav-link hamburger" ></i></li>
            <li className="nav-item"> <Link className="nav-link" to='/register'><span class="link-text">-Signup</span></Link></li>
            <li className="nav-item"> <Link className="nav-link" to='/login'><span class="link-text">-Login</span></Link></li>
            <li className="nav-item"> <Link className="nav-link" to='/profiles'><span class="link-text">-Profiles</span></Link> </li>
            <li className="nav-item"> <Link className="nav-link" to='/posts'><span class="link-text">-Sheds</span></Link>    </li>
            <li className="nav-item"> <Link className="nav-link" to="/help"><span class="link-text">-Help</span></Link></li>
            <li className="nav-item"> <p className="nav-link" to="/help"><span class="link-text">&copy;2020 Shedbnb</span></p></li>
        </ul>
    );

    return (
        <Fragment>
        {profile === null || loading ? (
            <Fragment>
                </Fragment>
        ) : (
        <nav className="navbar">
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks}</Fragment>) }
        </nav>
        )
    }
    </Fragment>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(Navbar)


