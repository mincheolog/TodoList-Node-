import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ItemCheckDialog extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { open_status, onAlertClose } = this.props;

        return (
            <Dialog
                open={open_status}
                onClose={(e) => {
                    e.stopPropagation();
                    onAlertClose(0);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"test item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        OK?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        onAlertClose(0);
                    }} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        onAlertClose(1);
                    }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}