import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {deletePost } from '../../actions/post'
import logo from '../../img/Shedbnb.png'


const PostItem = ({ deletePost, auth, post: { _id, name, avatar, user, date, shed, location, picture, text, email } }) => {
    return(
        <Fragment>
        <nav className="second-nav">
            <div className="logo-flex-2">
          <a href="/"><img src={logo} alt="logo" /></a>
            </div>
          </nav>
          <a  href="/posts" ><button className="style-button" >Go back</button></a>

        <div className="profiles-2">
        <div className="post-id">
            <div className="post-id-1">
            <img  src={picture} alt="shed-pic" />
            </div>
            <div className="post-id-2">
            <h1>{shed}</h1>
            <p>Hosted by: {name}</p>
            <img src={avatar} alt="avatar" />
            <br />
            <p>{text}</p>
            <br />
            <p>Located on: {location}</p>
            <br />
            <p>Posted on: <Moment>{date}</Moment></p>
            <br />
            <a href={`mailto:${email}`}>Contact: {email}</a>
            <br />
            <br />
        {!auth.loading && user === auth.user._id && (
              <Fragment>
                <button
                onClick={e => deletePost(_id)}      
                type="button"
                className="indie-shed-item-button-2">
                <i className="fas fa-times"></i>
              </button>
              <p>Delete shed</p>
              </Fragment>
          )}
          </div>
          </div>
        </div>
        </Fragment>
    )
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(PostItem)
