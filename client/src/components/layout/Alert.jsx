import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alert !== null && alert.length > 0 && alerts.map(alert => (
    alert(alert.msg)
));

Alert.PropTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);