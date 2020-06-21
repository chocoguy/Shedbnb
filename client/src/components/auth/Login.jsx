import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import logo from '../../img/Shedbnb.png';



const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    }); //this is your state we are using react hooks

    const {email, password,} = formData; //destructuring that way you dont say formData.name

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value}); //the ... spread operator copies the form data 


    const onSubmit = async e =>{
        e.preventDefault();
        login(email, password);
    }

    //redirect when the user logs in
    if(isAuthenticated) {
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
         <h1 className="large text-primary">Login</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
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
        <input type="submit" className="login-signup-button" value="-Login-" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up!</Link>
      </p>
      </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);