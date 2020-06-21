import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {deletePost } from '../../actions/post'

const PostItemMin = ({ deletePost, auth, post: { _id, name, avatar, user, date, shed, location, picture, text, email } }) => {
    return(
        <div className="indie-shed-item">
            <a href={`/posts/${_id}`}>
            <img src={picture} alt="a shed" className="shed-item-picture" />
            <p>{shed}</p>
            <p>Hosted by: {name}</p>
            <div className="indie-shed-item-flex">
            <i class="fas fa-map-marker-alt"></i>
            <p>{location}</p>
            </div>
            </a>
        {!auth.loading && user === auth.user._id && (
              <Fragment>
                <button
                onClick={e => deletePost(_id)}      
                type="button"
                className="indie-shed-item-button">
                <i className="fas fa-times"></i>
              </button>
              <p className="text-align-center">Delete</p>
              </Fragment>
          )}
        </div>
    )
}




const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(PostItemMin)
