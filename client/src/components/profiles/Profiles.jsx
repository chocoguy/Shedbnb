import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileItem from './Profileitem';
import { getProfiles } from '../../actions/profile';
import logo from '../../img/Shedbnb.png'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles()
    }, []);
    return(
        <Fragment>
            { loading ? <Spinner /> : <Fragment>

                <nav className="second-nav">
            <div className="logo-flex-2">
          <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
          </nav>

                <div className="profiles">
                <h1>Profiles</h1>
                <div className="profiles-2">
                <div className="profile-item">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile.id} profile={profile} />
                        ))
                    ) : <Spinner />}
                    </div>
                </div>
                </div>
                </Fragment> }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles)