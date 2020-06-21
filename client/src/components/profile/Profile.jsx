import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfile } from '../../actions/profile'
import logo from '../../img/Shedbnb.png'

const Profile = ({ getProfile, profile: { profile, loading }, auth, match }) => {

    useEffect(() => {
        getProfile(match.params.id);
    }, [getProfile]);

    return (
        <Fragment>
        {profile === null || loading ? (
            <Spinner />
        ) : (
            <Fragment>

            <nav className="second-nav">
            <div className="logo-flex-2">
          <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
          </nav>
            <h1 className="text-align-center">User</h1>
            {auth.isAuthenticated && 
                 auth.loading === false &&
                 auth.user._id === profile.user._id && (
                     <a href='/edit-profile' className="btn btn-dark">
                         <button className="style-button">Edit profile</button>
                     </a>
                 )}
                  <a href='/profiles' className='btn btn-light'>
                    <button className="style-button">Back To profiles</button>
                </a>
          <div className="profiles-2">
                 <div className="profile">
                     <div>
                     <ProfileTop profile={profile} />
                     <ProfileAbout profile={profile} />
                     </div>
                 </div>
                 </div>
         </Fragment>
        )}
    </Fragment>
    )
}




const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfile })(Profile)
