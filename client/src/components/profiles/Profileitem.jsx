import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Profileitem = ({ profile: {
    user: { _id, name, avatar },
    desc,
    location,
    lang,
    website,
    badges
} }) => {
    return(
        <Fragment>
            <a href={`/profile/${_id}`}>
            <div className="indie-profile-item">
            <div>
            <img src={avatar} alt="" className="round-img" />
            </div>
            <div>
            <h2>{name}</h2>
                <p>{location}</p>
                {badges.map(badge => (
                    <i class={badge}></i>
                ))}
            </div>
            </div>
            </a>
        </Fragment>
    )
}




Profileitem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Profileitem