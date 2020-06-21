import React, {Fragment} from 'react';
import logo from '../../img/Shedbnb.png'

const Help = ({}) => {


    return(
    <Fragment>
    <nav className="second-nav">
    <div className="logo-flex-2">
  <a href="/"><img src={logo} alt="logo" /></a>
    </div>
  </nav>
    <h1 className="text-align-center">Help</h1>
  <div className="profiles-2">
      <div className="dashboard-flex">
         <h1>Welcome to Shedbnb, airbnb but for sheds</h1>
         <br />
         <h4>If you find any bugs or just want to contact me</h4>
         <a href="mailto:Edgar@decahex.com">Edgar@decahex.com</a>
         <br />
         <h2>Code is found on Github</h2>
         <a href="https://github.com/chocoguy/Shedbnb">Code</a>
         </div>
         </div>
 </Fragment>
    )
}

export default Help