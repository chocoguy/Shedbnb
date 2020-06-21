import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import logo from '../../img/Shedbnb.png'


const PostForm = ({ addPost }) => {
    const[formData, setFormData] = useState({
      text: '',
      email: '',
      shed: '',
      location: '',
      picture: ''
    });

      const { text, email, shed, location, picture } = formData;

      const onChange = e => setFormData({...formData, [e.target.name]: e.target.value  });

      const onSubmit = async e => {
        e.preventDefault();
        addPost({ text, email, shed, location, picture })
        window.location.reload(false);
      }
    return (
      <Fragment>

          <nav className="second-nav">
            <div className="logo-flex-2">
          <a href="/"><img src={logo} alt="logo" /></a>
            </div>
          </nav>

        <div className="login">
        <p className="large text-primary">Post a new shed</p>
        <form className="form" onSubmit={e => onSubmit(e)}>

            <div className="dashboard-flex">
            <input type="text"  className="form-group" name="text"  placeholder="shed description" value={ text } onChange={e => onChange(e)} required></input>
          
            <input type="text" className="form-group" name="email"  placeholder="email for contact" value={ email } onChange={e => onChange(e)} required ></input>

            <input type="text" className="form-group" name="shed"  placeholder="Name of the shed" value={ shed } onChange={e => onChange(e)} required></input>

            <input type="text" className="form-group" name="location"  placeholder="Location of the shed" value={ location } onChange={e => onChange(e)} required></input>

            <input type="text" className="form-group" name="picture"  placeholder="Picture link" value={ picture } onChange={e => onChange(e)} required></input>

          
          <input type="submit" class="login-signup-button" value="Submit" />
          </div>

        </form>
        </div>
        </Fragment>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm) //null becauase we are not bringing in any state from redux 1st half redux second half react
