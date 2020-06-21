
import React, { useEffect, useState, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import logo from '../../img/Shedbnb.png';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    desc: '',
    location: '',
    lang: '',
    website: '',
    badges: ''
  });


  const {
    desc,
    location,
    lang,
    website,
    badges
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    window.location.reload(false);
  };

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return  (
    <Fragment>

            <nav className="second-nav">
            <div className="logo-flex-2">
          <a href="/"><img src={logo} alt="logo" /></a>
            </div>
          </nav>

      <div className="login">
      <h1 className="large text-primary">Create/Edit Your Profile</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Desc"
            name="desc"
            value={desc}
            onChange={onChange}
          />
          <small className="form-text">
            Basic info
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            if you have a website.. put it here
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state (Ex: Chicago, IL)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Languages"
            name="lang"
            value={lang}
            onChange={onChange}
          />
          <small className="form-text">
            comma seperated values (eg. English,Spanish,Japanese)
          </small>
        </div>

        <input type="submit" className="login-signup-button" />
      </form>
      <a  href="/dashboard">
          <button className="login-signup-button">Go Back</button>
        </a>
      </div>
    </Fragment>
  );
};


const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);


//loading && profile === null ? (
//  <Redirect to="/dashboard" />
//) :