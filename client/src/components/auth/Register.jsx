import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux'; 
import {Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert'; 
import { register } from '../../actions/auth';
import logo from '../../img/Shedbnb.png';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async  e =>{
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match!!!', 'danger'); //this will pass into redux
        } else {
         register({ name, email, password});
        }
    };

    if(isAuthenticated){
      return <Redirect to="/profiles" />
    }


    return(
        <Fragment>

          <nav className="second-nav">
            <div className="logo-flex-2">
          <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
          </nav>
          <div className="login">
        <h1>Sign up</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div>
            <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="login-signup-button" value="-Register-" />
        </form>
        <p>This site uses Gravatar so if you want Profile pic use Gravatar email</p>
        </div>
        </Fragment>
    )
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register)