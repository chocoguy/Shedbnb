import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItemMin from './PostItemMin';
import { getPosts } from '../../actions/post';
import { Link } from 'react-router-dom';
import logo from '../../img/Shedbnb.png'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
      getPosts();
    }, [getPosts]);
  
    return loading ? (
      <Spinner />
    ) : (
      <Fragment>
         <nav className="second-nav">
            <div className="logo-flex-2">
          <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
          </nav>
          <div className="randomh1color">
          <h1>Sheds</h1>
          </div>
          <div className="profiles-3">
          <div className="shed-item">
          {posts.map(post => (
            <PostItemMin key={post._id} post={post} />
          ))}
        </div>
        </div>
      </Fragment>
    );
  };
  

  
  const mapStateToProps = state => ({
    post: state.post
  });
  
  export default connect(
    mapStateToProps,
    { getPosts }
  )(Posts);


//  <Link to={`/posts/${_id}`} className="btn btn-primary">
  //link to post </Link>