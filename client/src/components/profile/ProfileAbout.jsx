import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    desc,
    lang,
    user: {name},
    location,
    website,
    badges
}
}) => {
    return (
        <div>
        <p>"{desc}"</p>
        <br />
        <p>Location: {location}</p>
        <p>Website: {website}</p>
        <br />
        <p>Languages</p>
        <div class="langs">
            {lang.map((lan, index) => (
                <div key={index}>
                    <p>-{lan}</p>
                </div>
            ))}
        </div>
        <hr />
        {badges.map(badge => (
                    <i class={badge}></i>
                ))}
        </div>
    )
}

//TODO in badges set a function so that if no badges are there display no badges
//TODO show the sheds of the current user displayed

export default ProfileAbout
