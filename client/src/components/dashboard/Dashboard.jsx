import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import logo from '../../img/Shedbnb.png'

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);


    

    return loading && profile === null ? <Spinner /> : <Fragment>
        
    <nav className="second-nav">
    <div className="logo-flex-2">
  <a href="/"><img src={logo} alt="logo" /></a>
    </div>
  </nav>
    <h1 className="text-align-center">Dashboard</h1>
   
  <div className="profiles-2">
      <div className="dashboard-flex">
            <h1>Welcome</h1>
            <p>What would you like to do?</p>
            <a href="/create-profile"><button className="style-button">Create/Edit profile</button></a>
            <a href="/post"><button className="style-button">Host a shed</button></a>
            </div>
         </div>
    </Fragment>

}



//user.name

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})



export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
