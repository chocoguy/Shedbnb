import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import logo from '../../img/Shedbnb.png';
import shed1 from '../../img/shed1.jpg';
import shed2 from '../../img/shed2.jpg';
import fedex from '../../img/fedex.png';
import ups from '../../img/ups.png';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated){
        return (
            <div>
            <div className="landing">
                <div className="logo-flex">
                <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <h1>Shedbnb helps you with<br /> all of your storage needs<br /> while you travel</h1>
            </div>
            <div className="landing-2">
    
            <div>
                 <img src={shed1} alt='Colorful sheds' />
            </div>
    
            <div>
                <h1>Rent sheds around the world store whatever you need</h1>
            </div>
    
            <div>
                <h1>Host your own shed and make money</h1>
            </div>
    
            <div>
                <img src={shed2} alt="shed at the sea" />
            </div>
    
    
            <div className="shipping-logo">
                <img src={fedex} alt="fedex" />
                <img src={ups} alt="ups" />
            </div>
    
    
            <div>
                <h1>Dont't deal with all the extra luggage! <br /> get your items shipped home with UPS or FedEx</h1>
            </div>
    
    
            </div>
            <div className="landing-3">
                <h1>Get started today!</h1>
                <Link to='/posts'><button>View sheds</button></Link>
            </div>
            </div>
        )
    }
    return(
        <div>
        <div className="landing">
            <div className="logo-flex">
            <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <h1>Shedbnb helps you with<br /> all of your storage needs<br /> while you travel</h1>
        </div>
        <div className="landing-2">

        <div>
             <img src={shed1} alt='Colorful sheds' />
        </div>

        <div>
            <h1>Rent sheds around the world store whatever you need</h1>
        </div>

        <div>
            <h1>Host your own shed and make money</h1>
        </div>

        <div>
            <img src={shed2} alt="shed at the sea" />
        </div>


        <div className="shipping-logo">
            <img src={fedex} alt="fedex" />
            <img src={ups} alt="ups" />
        </div>


        <div>
            <h1>Dont't deal with all the extra luggage! <br /> get your items shipped home with UPS or FedEx</h1>
        </div>


        </div>
        <div className="landing-3">
            <h1>Get started today!</h1>
            <Link to='/register'><button>Sign up</button></Link>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/posts'><button>View sheds</button></Link>
        </div>
        </div>
    )
}


Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(mapStateToProps)(Landing);