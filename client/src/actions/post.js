import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from './types';


//* Get all sheds
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//* Delete a Shed
export const deletePost = id => async dispatch => {
    try {
       const res = await axios.delete(`/api/posts/${id}`);
       
       dispatch({
           type: DELETE_POST,
           payload: res
       });

       dispatch(setAlert('Post Removed!!', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//* Add a shed

export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
      const res = await axios.post('/api/posts/', formData, config);
  
      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      dispatch(setAlert('Post Created!!!', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
}


//* Get one shed

export const getPost = id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}