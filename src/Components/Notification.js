import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'

import { toggleNotificationAction } from '../state/notification'


const Notification = (props) => (
    <div>
        <Snackbar
            open={props.isNotificationOpen}
            message={props.notificationMessage}
            autoHideDuration={4000}
            onRequestClose={props.toggleNotificationAction}
        />
    </div>
)

const mapStateToProps = state => ({
    isNotificationOpen: state.notification.isNotificationOpen,
    notificationMessage: state.notification.notificationMessage
})

const mapDispatchToProps = dispatch => ({
    toggleNotificationAction: (message) => dispatch(toggleNotificationAction(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)